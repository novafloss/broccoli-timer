const Plugin = require('broccoli-plugin');
const path = require('path');

// Create a subclass MyLoggerPlugin derived from Plugin
_MyTimerPlugin.prototype = Object.create(Plugin.prototype);
_MyTimerPlugin.prototype.constructor = _MyTimerPlugin;
function _MyTimerPlugin(inputNodes, options) {
  options = options || {};
  Plugin.call(this, inputNodes, {
    annotation: options.annotation
  });
  this.options = options;
}

_MyTimerPlugin.prototype.build = function() {
  const { label, action } = this.options;
  if (action === 'start') {
    console.time(label);
  } else {
    console.timeEnd(label);
  }
};

function _timer(label, action) {
  return (tree)=> new _MyTimerPlugin(tree? [tree] : [], { label, action });
}

function startTimer(label) {
  return _timer(label, 'start');
}

function stopTimer(label) {
  return _timer(label, 'end');
}

module.exports = _MyTimerPlugin;
module.exports.startTimer = startTimer;
module.exports.stopTimer = stopTimer;
