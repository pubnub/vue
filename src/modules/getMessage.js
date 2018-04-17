/**
 * Add a channel to the set of data
 *
 * @param {string} channel
 * @returns {boolean}
 */
function init(channel) {
  if (channel in this._data.messages) {
    return false;
  } else {
    this._data.messages[channel] = [];
    return true;
  }
}

/**
 * Emit a message through a callback and update the set of data
 *
 * @param {string} channel
 * @param {object} message
 */
function emit(channel, message) {
  let messages = this._data.messages[channel];
  let keepMessages = this._keepMessages[channel];

  messages.push(message);

  if (keepMessages && messages.length > keepMessages) {
    this._data.messages[channel].splice(0, messages.length - keepMessages);
  }

  this._broadcast.emit('message', channel, message);
}

/**
 * Get to receive messages from a channel through a callback
 *
 * @param {string} channel
 * @param {function} callback
 * @returns {[]}
 */
export function getMessage(channel) {
  let callback;
  let keepMessages = 100;

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
    this._listener.message = (message) => {
      if (message.subscription && this._broadcast.isSubscribe('message', message.subscription)) {
        emit.call(this, message.subscription, message);
      }

      if (message.channel && this._broadcast.isSubscribe('message', message.channel)) {
        emit.call(this, message.channel, message);
      }
    };
  }

  return this._data.messages[channel];
}
