const { WebSocket } = require('ws');
const maxAPI = require("max-api");

var sounds = [
  'piano',
  'bassSlide',
  'bird',
  'dub',
  'kick',
  'horn',
  'guitar',
  'bubbles',
  'hey',
  'fuck',
  'oink',
  'moo',
  'bong',
  'cough',
  'kisses',
  'zipper',
  'ow',
  'trumpet',
  'bass'
];


const ws = new WebSocket('wss://websynth-socket.glitch.me', {
  headers: {
    "user-agent": "Mozilla"
  }
});

ws.on('open', () => {
  console.log('connected')
});

ws.on('message', (msg) => {
  const buffer = Buffer.from(msg);
  const parsedMessage = JSON.parse(buffer.toString());

  console.log(parsedMessage);
  if (!parsedMessage.directions) {
    onNewConnection(parsedMessage.userId);
  }

  else {
    onDirection(parsedMessage.directions, parsedMessage.userId)
  }
})

function onNewConnection(userId) {
  var sound = sounds[Math.floor(Math.random() * sounds.length)];
  console.log("New connection: " + userId);
  maxAPI.outlet('connectUser', userId, sound);
  ws.send(JSON.stringify({ userId, sound }))
}

function onDirection(direction, userId) {
  // maxAPI.outlet('sendMessage', userId, direction.location, direction.operation, ...direction.value)
  maxAPI.outlet('send', userId)
  maxAPI.outlet(direction.location, direction.operation, ...direction.value)
}