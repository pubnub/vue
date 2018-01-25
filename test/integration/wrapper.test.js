/* global describe, it */
/* eslint no-console: 0 */
import PubNub from 'pubnub';
import Wrapper from '../../src/wrapper';
import { config, getRandomChannel } from '../testHelper';
import { assert } from 'chai';

let wrapper;
let stack;
let stack2;

let channel1 = getRandomChannel();
let channel2 = getRandomChannel();
let channel3 = getRandomChannel();

describe('wrapper', () => {
  it('should init', (done) => {
    wrapper = new Wrapper(new PubNub(config.demo));
    assert.deepEqual(wrapper._data, { messages: {}, presence: {}, status: {} }, 'the wrapper was not initialized');
    done();
  });

  it('should get real time messages', (done) => {
    wrapper.subscribe({ channels: [channel1] });

    wrapper.getMessage(channel1, (msg) => {
      assert.isOk(msg.message, 'hello world', 'it was not the message expected');
      assert.isOk(msg.channel, channel1, 'it was not the channel expected');
      done();
    });

    wrapper.publish({ channel: channel1, message: 'hello world' });
  }).timeout(2000);

  it('should retrieve from getMessage', (done) => {
    stack = wrapper.getMessage(channel1);

    assert.isOk(stack[0].message, 'hello world', 'it was not the message expected');
    assert.isOk(stack[0].channel, channel1, 'it was not the channel expected');
    done();
  });

  it('should stack messages', (done) => {
    wrapper.subscribe({ channels: [channel2] });

    stack2 = wrapper.getMessage(channel2);

    let t = setTimeout(() => {
      assert.lengthOf(stack2, 2);
      assert.lengthOf(wrapper.getMessage(channel2), 2);
      clearTimeout(t);
      done();
    }, 1500);

    wrapper.publish({ channel: channel2, message: 'hello world 1' });
    wrapper.publish({ channel: channel2, message: 'hello world 2' });
  }).timeout(2000);

  it('should get the status', (done) => {
    wrapper.getStatus((st) => {
      assert.isOk(st.category, 'PNConnectedCategory', 'it was not the message expected');
      done();
    });

    wrapper.subscribe({ channels: [channel3] });
  });

  it('should clean a stack of messages', (done) => {
    wrapper.clean(channel2);
    assert.lengthOf(wrapper.getMessage(channel2), 0);
    done();
  });
});
