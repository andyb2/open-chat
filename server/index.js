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

  socket.on('create-user', ( username ) => {
    connectedUsers.set(socket.id, username);

    if ( !roomData['general-lobby'] ) {
      roomData['general-lobby'] = [];
    }

    roomData['general-lobby'].push(username);
    const usersInRoom = roomData['general-lobby'];
    socket.join('general-lobby');

    io.to('general-lobby').emit('join-room', usersInRoom);
  });

  socket.on('join-room', ({ username, currentRoom }) => {
    if ( !roomData[`${ currentRoom }`] ) {
      roomData[`${ currentRoom }`] = [];
    } 
    roomData[`${ currentRoom }`].push( username );
    const usersInRoom = roomData[`${ currentRoom }`];
    socket.join(`${ currentRoom }`);
    io.in(`${ currentRoom }`).emit("join-room", usersInRoom);
    
  });

  socket.on('remove-room-user', ({ previousRoom, updateUserList }) => {
    roomData[`${ previousRoom }`] = updateUserList;
    console.log(roomData[`${ previousRoom }`]);
    socket.leave(`${ previousRoom }`)
    io.in(`${ previousRoom }`).emit('remove-room-user', updateUserList);
  })

  socket.on('new-message', ({ message, currentRoom, username }) => {
    io.to(`${ currentRoom }`).emit('new-message', { message, username })
  })

  socket.on('disconnect', () => {
    const ID = socket.id;
    const findDisconnectedUser = connectedUsers.get(ID);
    let data = [];
    let roomNumber = '';
    if (findDisconnectedUser) {
      connectedUsers.delete(ID);
      for (const room in roomData) {
        if ( roomData[room].includes(findDisconnectedUser) ) {
          const user = roomData[room].indexOf(findDisconnectedUser);
          roomData[room].splice(user, 1);
          data = roomData[room];
          roomNumber = room;
        }
      }
      io.in(`${ roomNumber }`).emit('remove-room-user', data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
