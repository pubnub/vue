/**
 * Add a channel to the state pn_presence
 *
 * @param {string} channel
 * @returns {boolean}
 */
function init(channel) {
  if (this._data.presence[channel]) {
    return false;
  } else {
    this._data.presence[channel] = {};
    return true;
  }
}

/**
 * Emit a presence information through a callback and update the state
 *
 * @param {string} channel
 * @param {object} presence
 */
function emit(channel, presence) {
  this._data.presence[channel] = presence;
  this._broadcast.emit('presence', presence.channel, presence);
}


/**
 * Get to receive presence information from a channel through a callback
 *
 * @param {string} channel
 * @param {function} callback
 * @returns {object}
 */
export function getPresence(channel, callback) {
  this._broadcast.presence(channel, callback);

  init.call(this, channel);

  if (!this._listener.presence) {
    this._listener.presence = (ps) => {
      if (ps.subscription && this._broadcast.isSubscribe('presence', ps.subscription)) {
        emit.call(this, ps.subscription, ps);
      }

      if (ps.channel && this._broadcast.isSubscribe('presence', ps.channel)) {
        emit.call(this, ps.channel, ps);
      }
    };
  }

  if (this._data && this._data.presence) {
    return this._data.presence[channel];
  } else {
    return {};
  }
}
