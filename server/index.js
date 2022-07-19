const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const connectedUser = [];
const userData = new Map();

io.on('connection', (socket) => {

  socket.on('join-room', async (username) => {
    socket.join("main-lobby");
    connectedUser.push(username);
    userData.set(socket.id, username);
    io.to("main-lobby").emit("join-room", connectedUser);
  });

  socket.on('disconnect', () => {
    const ID = socket.id
    const findDisconnectedUser = userData.get(ID);
    if (connectedUser.includes(findDisconnectedUser)) {
      const foundUser = connectedUser.indexOf(findDisconnectedUser);
      connectedUser.splice(foundUser, 1);
      socket.broadcast.emit('remove-room-user', findDisconnectedUser);
    }
  })
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
