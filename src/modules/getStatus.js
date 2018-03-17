/**
 * Get to receive status information from a channel through a callback
 *
 * @param {function} callback
 * @returns {object}
 */
export function getStatus(callback) {
  this._broadcast.status(callback);

  if (!this._listener.status) {
    this._listener.status = (st) => {
      if (!this._broadcast.isSubscribe('status')) {
        return true;
      }
      this._data.status = st;
      this._broadcast.emitStatus(st);
    };
  }

  return this._data.status;
}

