const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 8080;
const { connectedUsers, roomData } = require('./users');
const { Socket } = require('dgram');

const { json, urlencoded } = express;

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.post('/create-user', (req, res) => {
  const { user } = req.body
  for (const users of connectedUsers) {
    if (users[1] === user) return res.json(false);
  }
  return res.json(true);
});


io.on('connection', (socket) => {

  socket.once('create-user', (userData) => {
    const { username } = userData;
    const socketId = socket.id;
    const client = {
      socket: socketId,
      ...userData
    }
    connectedUsers.set(socket.id, username);
    if (!roomData['general-lobby']) {
      roomData['general-lobby'] = [];
    }
    roomData['general-lobby'].push(client);
    const usersInRoom = roomData['general-lobby'];
    socket.join('general-lobby');
    io.in('general-lobby').emit('join-room', usersInRoom);
  });

  socket.on('join-room', ({ user, currentRoom }) => {
    if (!roomData[`${currentRoom}`]) {
      roomData[`${currentRoom}`] = [];
    }
    roomData[`${currentRoom}`].push(user);
    const usersInRoom = roomData[`${currentRoom}`];
    socket.join(`${currentRoom}`);
    io.in(`${currentRoom}`).emit("join-room", usersInRoom);

  });

  socket.on('remove-room-user', ({ previousRoom, updateUserList }) => {
    roomData[`${previousRoom}`] = updateUserList;
    socket.leave(`${previousRoom}`)
    io.in(`${previousRoom}`).emit('remove-room-user', updateUserList);
  });

  socket.on('new-message', ({ message, room, user, timeOfMessage }) => {
    io.in(`${room}`).emit('message', { message, user, timeOfMessage });
  });

  socket.on('private-message', ({ message, room, user, timeOfMessage, sender }) => {
    const { socketId } = room;
    io.to(socketId).emit('message', { message, user, timeOfMessage, sender, privateMessage: true });
  });

  socket.once('disconnect', () => {
    const ID = socket.id;
    const findDisconnectedUser = connectedUsers.get(ID);
    
    if (findDisconnectedUser) {
      let data = [];
      let roomNumber = '';
      let idx = 0;
      for (const room in roomData) {
        if (roomData[room].length > 0) {
          for (const user in roomData[room]) {
            if (roomData[room][user].username === findDisconnectedUser) {
              roomData[room].splice(idx, 1);
              data = roomData[room];
              roomNumber = room;
            }
            idx++
          }
          idx = 0;
        }
      }
      connectedUsers.delete(ID);
      io.in(`${roomNumber}`).emit('remove-room-user', data);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
