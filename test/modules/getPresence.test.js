/* global describe, it, before */
/* eslint no-console: 0 */
import { assert } from 'chai';
import { getPresence } from '../../src/modules';
import Broadcast from '../../src/broadcast';

let mock = {};

describe('getPresence', () => {
  before((done) => {
    mock._broadcast = new Broadcast();
    mock._listener = {};
    mock._data = { presence: {} };
    mock.getPresence = getPresence.bind(mock);
    done();
  });

  it('should allocate a channel', (done) => {
    mock.getPresence('channel1');
    assert.deepEqual(mock._data, { presence: { channel1: {} } }, 'channel1 was not allocated');
    done();
  });

  it('should broadcast a presence message', (done) => {
    mock.getPresence('channel2', (ps) => {
      assert.deepEqual(ps, { channel: 'channel2', action: 'join' }, 'it was not the message expected');
      done();
    });

    mock._listener.presence({ channel: 'channel2', action: 'join' });
  });

  it('should retrieve the presence', (done) => {
    assert.deepEqual(mock.getPresence('channel2'), { channel: 'channel2', action: 'join' }, 'it was not the message expected');
    done();
  });
});
