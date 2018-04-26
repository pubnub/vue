'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresence = getPresence;

function init(channel) {
  if (this._data.presence[channel]) {
    return false;
  } else {
    this._data.presence[channel] = {};
    return true;
  }
}

function emit(channel, presence) {
  this._data.presence[channel] = presence;
  this._broadcast.emit('presence', presence.channel, presence);
}

function getPresence(channel, callback) {
  var _this = this;

  this._broadcast.presence(channel, callback);

  init.call(this, channel);

  if (!this._listener.presence) {
    this._listener.presence = function (ps) {
      if (ps.subscription && _this._broadcast.isSubscribe('presence', ps.subscription)) {
        emit.call(_this, ps.subscription, ps);
      }

      if (ps.channel && _this._broadcast.isSubscribe('presence', ps.channel)) {
        emit.call(_this, ps.channel, ps);
      }
    };
  }

  return this._data.presence[channel];
}
//# sourceMappingURL=getPresence.js.map
