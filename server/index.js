const WebSocket = require('ws');


const PORT = 443;

const wsServer = new WebSocket.Server({
  port: PORT
})

wsServer.on('connection', function (socket) {
  console.log("A new connection is established");

  socket.on('message', function (msg) {
    console.log('Received message: ' + msg);

    wsServer.clients.forEach(function (client) {
      client.send("Someone said: " + msg);
    })
  })
})

console.log('Listening on port: ' + PORT)