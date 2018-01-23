/* global describe, it, before */
/* eslint no-console: 0 */
import { assert } from 'chai';
import { getMessage } from '../../src/modules';
import Broadcast from '../../src/broadcast';

let mock = {};

describe('getMessage', () => {
  before((done) => {
    mock._broadcast = new Broadcast();
    mock._listener = {};
    mock._data = { messages: {} };
    mock._keepMessages = {};
    mock.getMessage = getMessage.bind(mock);
    done();
  });

  it('should allocate a channel', (done) => {
    mock.getMessage('channel1');
    assert.deepEqual(mock._data, { messages: { channel1: [] } }, 'channel1 was not allocated');
    done();
  });

  it('should set to 100 the keepMessages', (done) => {
    assert.deepEqual(mock._keepMessages, { channel1: 100 }, 'it was not set 100 by default');
    done();
  });

  it('should set a custom value to the keepMessages', (done) => {
    mock.getMessage('channel2', 50);
    assert.deepEqual(mock._keepMessages, { channel1: 100, channel2: 50 }, 'it was not set 50 to channel2');
    done();
  });

  it('should stack a message', (done) => {
    mock._listener.message({ channel: 'channel1', message: 'message #1' });
    assert.deepEqual(mock._data.messages.channel1, [{ channel: 'channel1', message: 'message #1' }], 'it was not stacked the message');
    done();
  });

  it('should broadcast a message', (done) => {
    mock.getMessage('channel3', (msg) => {
      assert.deepEqual(msg, { channel: 'channel3', message: 'message #1' }, 'it was not the message expected');
      done();
    });

    mock._listener.message({ channel: 'channel3', message: 'message #1' });
  });

  it('should change the stacks', (done) => {
    assert.lengthOf(mock._data.messages.channel1, 1);
    assert.lengthOf(mock._data.messages.channel2, 0);
    assert.lengthOf(mock._data.messages.channel3, 1);
    done();
  });
});
