/* global describe, it, before */
/* eslint no-console: 0 */
import { assert } from 'chai';
import { getStatus } from '../../src/modules';
import Broadcast from '../../src/broadcast';

let mock = {};

describe('getStatus', () => {
  before((done) => {
    mock._broadcast = new Broadcast();
    mock._listener = {};
    mock._data = { status: {} };
    mock.getStatus = getStatus.bind(mock);
    done();
  });

  it('should broadcast the status', (done) => {
    mock.getStatus((st) => {
      assert.deepEqual(st, { category: 'PNConnectedCategory' }, 'it was not the status expected');
      done();
    });

    mock._listener.status({ category: 'PNConnectedCategory' });
  });

  it('should retrieve the status', (done) => {
    assert.deepEqual(mock.getStatus(), { category: 'PNConnectedCategory' }, 'it was not the status expected');
    done();
  });
});
