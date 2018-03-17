/* global describe, it */
/* eslint no-console: 0 */
import { assert } from 'chai';
import PubNubVue from '../../src/pubnub-vue';
import { config } from '../testHelper';

let defaultInstance;
let instance1;
let instance2;
let uuid1;
let uuid2;

describe('pubnub-vue', () => {
  it('should create the instance by default', (done) => {
    defaultInstance = PubNubVue.getInstance(null, config.demo);
    assert.isOk(defaultInstance);
    done();
  });

  it('should create an instance', (done) => {
    instance1 = PubNubVue.getInstance('instance1', config.demo);
    uuid1 = instance1.getOriginalInstance()._config.UUID;
    assert.isOk(instance1);
    done();
  });

  it('should create another instance', (done) => {
    instance2 = PubNubVue.getInstance('instance2', config.demo);
    uuid2 = instance2.getOriginalInstance()._config.UUID;
    assert.isOk(instance2);
    done();
  });

  it('should be difference instances', (done) => {
    assert.notEqual(uuid1, uuid2);
    done();
  });

  it('should retrieve an instance using the name', (done) => {
    let instance = PubNubVue.getInstance('instance2');
    let uuid = instance.getOriginalInstance()._config.UUID;
    assert.equal(uuid, uuid2);
    done();
  });

  it('should retrieve the default instance', (done) => {
    let instance = PubNubVue.getDefaultInstance();
    let uuidA = instance.getOriginalInstance()._config.UUID;
    let uuidB = defaultInstance.getOriginalInstance()._config.UUID;
    assert.equal(uuidA, uuidB);
    done();
  });
});
