inlets = 1;
outlets = 0;

var users = {};
var patches = [];
var y = 500;

function connectUser(id, sound) {
  var position = Object.keys(users).length;
  users[id] = userPatch(id, sound, position * 400 + 100);
}

function userPatch(id, sound, x) {

  // var synthName = this.patcher.newdefault(x, y, "message")
  var synthName = this.patcher.newobject('message')
  synthName.setboxattr('patching_rect', [x, y, 200, 100])
  synthName.setattr('bgfillcolor', [0, 0, 0])
  synthName.setboxattr('textcolor', "Mapping Macro")
  synthName.setboxattr('fontsize', [30])

  var receiver = this.patcher.newdefault(x, y + 30, "receive", id);
  receiver.setboxattr('hidden', true)

  var router = this.patcher.newdefault(x, y + 100, "route", 'name', 'position', 'keyDown');
  router.setboxattr('hidden', true)

  var send = this.patcher.newdefault(x, y + 480, "s~", "output");
  send.setboxattr('hidden', true)


  this.patcher.connect(receiver, 0, router, 0);
  this.patcher.connect(router, 0, synthName, 0);

  var position = this.patcher.newdefault(x, y + 130,
    "function",
    "@domain", 2,
    "@range", 0, 2);

  position.setboxattr('patching_rect', [x, y + 50, 350, 300]);
  position.setboxattr('pointsize', 10);



  this.patcher.connect(router, 1, x, 0);


  patches.push(receiver, router, synthName, send, position)

  groove(router, send, sound, x, y)

  return;
}

function groove(router, send, sound, x, y) {
  var slice = this.patcher.newdefault(x, y + 250, "zl.slice", 1);
  slice.setboxattr('hidden', true)

  this.patcher.connect(router, 1, slice, 0);


  var signal = this.patcher.newdefault(x, y + 280, "sig~");
  signal.setboxattr('hidden', true)

  var groove = this.patcher.newdefault(x, y + 310, "groove~", sound, '@loop', 1);
  groove.setboxattr('hidden', true)


  var shiftConversion = this.patcher.newdefault(x, y + 340,
    "expr", "$f1", "/", "2", "*", "1200", "-", "600"
  );
  shiftConversion.setboxattr('hidden', true)


  var shifter = this.patcher.newdefault(x, y + 370, "freqshift~");
  shifter.setboxattr('hidden', true)

  var shiftMessage = this.patcher.newdefault(x + 100, 970, 'message')
  shiftMessage.setboxattr('patching_rect', [x, y + 370, 180, 100])
  shiftMessage.setboxattr('fontsize', [30])


  var gainConversion = this.patcher.newdefault(x, y + 400,
    "expr", "$f1", "/", "2", "*", "30", "-", "30"
  );
  gainConversion.setboxattr('hidden', true)

  var gain = this.patcher.newdefault(x, y + 430,
    "live.gain~", "@orientation", 1
  );
  gain.setboxattr('patching_rect', [x, y + 420, 360, 100])

  var intChecker = this.patcher.newdefault(x, y + 350, "select", "clear");
  intChecker.setboxattr("hidden", true);


  this.patcher.connect(router, 2, signal, 0);
  this.patcher.connect(signal, 0, groove, 0);
  this.patcher.connect(groove, 0, shifter, 0);
  this.patcher.connect(slice, 0, intChecker, 0);
  this.patcher.connect(intChecker, 1, shiftConversion, 0);
  this.patcher.connect(shiftConversion, 0, shiftMessage, 1);
  this.patcher.connect(shiftConversion, 0, shifter, 0);
  this.patcher.connect(slice, 1, gainConversion, 0);
  this.patcher.connect(gainConversion, 0, gain, 0);
  this.patcher.connect(shifter, 0, gain, 0);
  this.patcher.connect(gain, 0, send, 0);


  patches.push(signal, groove, shifter, slice, gainConversion, gain, shiftConversion, intChecker, shiftMessage);
}

function clearAll() {
  for (patchesIndex = 0; patchesIndex < patches.length; patchesIndex++) {
    var patch = patches[patchesIndex];
    this.patcher.remove(patch);
  }
  patches = []
  users = {}
}

function send() { }
function name() { }
function position() { }
function keyDown() { }
