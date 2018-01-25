/**
 * Clean the stack of messages for a channel or a set of channels
 *
 * @param {string|[string]} channel
 */
export function clean(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    this._data.messages[channel] = [];
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    this._data.presence[channel] = {};
  }
}
