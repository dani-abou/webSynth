const WebSocket = require("ws");
const uuidv4 = require("uuid").v4;

const PORT = 8000;

const wsServer = new WebSocket.Server({
  port: PORT,
});

const clients = {};
let admin = {};

function handleMessage(msg, userId) {
  console.log(userId + ", sent message: " + msg);

  admin.socket.send(JSON.stringify({ directions: JSON.parse(msg), userId }));
}

function handleDisconnect(userId) {
  delete clients[userId];
}


function handleAdminDisconnect() {
  admin = {};
  clients = {};
  wsServer.close();
}

function handleAdminMessage(msg) {
  const buffer = Buffer.from(msg);
  const parsedMessage = JSON.parse(buffer.toString());
  const { userId, ...message } = parsedMessage
  clients[parsedMessage.userId].send(JSON.stringify(message))
}

wsServer.on("connection", function (socket) {
  const userId = uuidv4();

  if (!admin.id) {
    admin = { id: userId, socket };
    console.log("Admin Connected: " + userId);

    socket.on("message", (msg) => handleAdminMessage(msg));
    socket.on("close", () => handleAdminMessage);
  } else {
    clients[userId] = socket;

    console.log("New client: " + userId);
    admin.socket.send(JSON.stringify({ userId }));

    socket.on("message", (msg) => handleMessage(msg, userId));
    socket.on("close", () => handleDisconnect(userId));
  }
});

console.log("Listening on port: " + PORT);





