'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessage = getMessage;

function init(channel) {
  if (channel in this._data.messages) {
    return false;
  } else {
    this._data.messages[channel] = [];
    return true;
  }
}

function emit(channel, message) {
  var messages = this._data.messages[channel];
  var keepMessages = this._keepMessages[channel];

  messages.push(message);

  if (keepMessages && messages.length > keepMessages) {
    this._data.messages[channel].splice(0, messages.length - keepMessages);
  }

  this._broadcast.emit('message', channel, message);
}

function getMessage(channel) {
  var _this = this;

  var callback = void 0;
  var keepMessages = 100;

  if (arguments.length === 2) {
    callback = arguments[1];
  } else if (arguments.length === 3) {
    callback = arguments[1];
    keepMessages = arguments[2];
  }

  if (init.call(this, channel)) {
    this._keepMessages[channel] = keepMessages;
    this._autoload.getHistory(channel, callback);
  }

  this._broadcast.message(channel, callback);

  if (!this._listener.message) {
    this._listener.message = function (message) {
      if (message.subscription && _this._broadcast.isSubscribe('message', message.subscription)) {
        emit.call(_this, message.subscription, message);
      }

      if (message.channel && _this._broadcast.isSubscribe('message', message.channel)) {
        emit.call(_this, message.channel, message);
      }
    };
  }

  return this._data.messages[channel];
}
//# sourceMappingURL=getMessage.js.map
