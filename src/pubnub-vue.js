import PubNub from 'pubnub';
import Wrapper from './wrapper';
import config from '../config.json';

let instances = {};

export default class PubNubVue {
  static getInstance(instanceName, initConfig) {
    if (typeof instanceName === 'string' && instanceName.length > 0) {
      if (instanceName in instances) {
        return instances[instanceName];
      } else {
        instances[instanceName] = new Wrapper(new PubNub(initConfig));
        return instances[instanceName];
      }
    } else if (!(config.default_instance_name in instances)) {
      instances[config.default_instance_name] = new Wrapper(new PubNub(initConfig));
      return instances[config.default_instance_name];
    } else {
      return this.getDefaultInstance();
    }
  }

  static getDefaultInstance() {
    return instances[config.default_instance_name];
  }
}
