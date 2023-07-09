inlets = 1;
outlets = 0;

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


var buffers = [];


function setupBuffers() {

  for (var bufferIndex = 0; bufferIndex < buffers.length; bufferIndex++) {
    var buffer = buffers[bufferIndex];
    this.patcher.remove(buffer);
  };
  buffer = [];
  for (var soundIndex = 0; soundIndex < sounds.length; soundIndex++) {
    var sound = sounds[soundIndex];
    var newBuffer = this.patcher.newdefault(soundIndex * 150, 400, "buffer~", sound, sound + '.wav');
    buffer.push(newBuffer);
  }
}


