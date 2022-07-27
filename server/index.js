const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 8080;
const { connectedUsers, roomData } = require('./users');

const { json, urlencoded } = express;

app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/create-user', (req, res) => {
  const { user } = req.body
  for (const users of connectedUsers) {
    if ( users[1] === user ) return res.json(false);
  }
  return res.json(true);
});


io.on('connection', (socket) => {

  socket.on('create-user', (userData) => {
    const { username } = userData;
    const socketId = socket.id;
    const client = {
      socket: socketId,
      ...userData
    }
    connectedUsers.set(socket.id, username);
    if ( !roomData['general-lobby'] ) {
      roomData['general-lobby'] = [];
    }
    roomData['general-lobby'].push(client);
    const usersInRoom = roomData['general-lobby'];
    socket.join('general-lobby');
    io.to('general-lobby').emit('join-room', usersInRoom);
  });

  socket.on('join-room', ({ user, currentRoom }) => {
    if ( !roomData[`${ currentRoom }`] ) {
      roomData[`${ currentRoom }`] = [];
    } 
    roomData[`${ currentRoom }`].push( user );
    const usersInRoom = roomData[`${ currentRoom }`];
    socket.join(`${ currentRoom }`);
    io.in(`${ currentRoom }`).emit("join-room", usersInRoom);
    
  });

  socket.on('remove-room-user', ({ previousRoom, updateUserList }) => {
    roomData[`${ previousRoom }`] = updateUserList;
    socket.leave(`${ previousRoom }`)
    io.in(`${ previousRoom }`).emit('remove-room-user', updateUserList);
  });

  socket.on('new-message', ({ message, currentRoom, user, timeOfMessage }) => {
    io.in(`${ currentRoom }`).emit('message', { message, user, timeOfMessage })
  });

  socket.on('private-message', (socketId) => {
    io.to(socketId).emit('private-message')
  })

  socket.on('disconnect', () => {
    const ID = socket.id;
    const findDisconnectedUser = connectedUsers.get(ID);
    if (findDisconnectedUser) {
      let data = [];
      let roomNumber = '';
      let idx = 0;
      for (const room in roomData) {
        if ( roomData[room].length > 0 ) {
          for (const user in roomData[room]) {
            if (roomData[room][user].username === findDisconnectedUser) {
              roomData[room].splice(idx, 1);
              data = roomData[room];
              roomNumber = room;
            }
            idx++
          }
          idx=0;
        }
      }
      connectedUsers.delete(ID);
      io.in(`${ roomNumber }`).emit('remove-room-user', data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
