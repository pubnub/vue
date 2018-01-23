import PubNub from 'pubnub';
import Wrapper from './wrapper';
import config from '../config';

let instances = {};

export default class PubNubVue {
  static getInstance(initConfig, instanceName) {
    if (typeof instanceName === 'string' && instanceName.length > 0) {
      if (instanceName in instanceName) {
        return instances[instanceName];
      } else {
        instances[instanceName] = new Wrapper(new PubNub(initConfig));
      }
    } else {
      return this.getOriginalInstance();
    }
  }

  static getOriginalInstance() {
    return instances[config.default_instance_name];
  }
}
