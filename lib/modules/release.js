'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = release;
function release(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    delete this._data.messages[channel];
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    delete this._data.presence[channel];
  }

  this._broadcast.unsubscribe(channel);
}
//# sourceMappingURL=release.js.map
