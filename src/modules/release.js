/**
 * Release the stack of messages for a channel or a set of channels
 *
 * @param {string|[string]} channel
 */
export function release(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    delete this._data.messages[channel];
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    delete this._data.presence[channel];
  }

  this._broadcast.unsubscribe(channel);
}
