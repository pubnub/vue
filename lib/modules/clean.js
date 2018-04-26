'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;
function clean(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    this._data.messages[channel] = [];
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    this._data.presence[channel] = {};
  }
}
//# sourceMappingURL=clean.js.map
