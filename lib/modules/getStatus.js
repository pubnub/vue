'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatus = getStatus;
function getStatus(callback) {
  var _this = this;

  this._broadcast.status(callback);

  if (!this._listener.status) {
    this._listener.status = function (st) {
      if (!_this._broadcast.isSubscribe('status')) {
        return true;
      }
      _this._data.status = st;
      _this._broadcast.emitStatus(st);
    };
  }

  return this._data.status;
}
//# sourceMappingURL=getStatus.js.map
