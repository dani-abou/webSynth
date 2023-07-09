// const { WebSocket, WebSocketServer } = require('ws');

// export function onConnect() {
//   console.log('connecting')
// }

// export function onSend(message) {
//   // I'm maintaining all active connections in this object
//   const clients = {};

//   // A new client connection request received
//   wsServer.on('connection', function (connection) {
//     // Generate a unique code for every user
//     const userId = uuidv4();
//     console.log(`Recieved a new connection.`);

//     // Store the new connection and handle messages
//     clients[userId] = connection;
//     console.log(`${userId} connected.`);
//   });
//   console.log('connecting')
// }