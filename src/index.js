import PubNubVue from './pubnub-vue';
import config from '../config.json';

let _pnConfig = {};

export default {
  /* eslint-disable no-param-reassign */
  install: (Vue, pnConfig) => {
    Vue.mixin({
      created() {
        _pnConfig = pnConfig;
        PubNubVue.getInstance(config.default_instance_name, _pnConfig);
      },
    });

    Vue.prototype.$pnGetInstance = function (instanceName) {
      return PubNubVue.getInstance(instanceName, _pnConfig);
    };

    Vue.prototype.$pnGetMessage = function (channel, callback, keepMessages, instanceName) {
      return PubNubVue.getInstance(instanceName).getMessage(channel, callback, keepMessages);
    };

    Vue.prototype.$pnGetPresence = function (channel, callback, instanceName) {
      return PubNubVue.getInstance(instanceName).getPresence(channel, callback);
    };

    Vue.prototype.$pnGetStatus = function (callback, instanceName) {
      return PubNubVue.getInstance(instanceName).getStatus(callback);
    };

    Vue.prototype.$pnSubscribe = function (args, instanceName) {
      PubNubVue.getInstance(instanceName).subscribe(args);
    };

    Vue.prototype.$pnUnsubscribe = function (args, instanceName) {
      PubNubVue.getInstance(instanceName).unsubscribe(args);
    };

    Vue.prototype.$pnPublish = function (args, callback, instanceName) {
      return PubNubVue.getInstance(instanceName).publish(args, callback);
    };

    Vue.prototype.$pnClean = function (channel, instanceName) {
      PubNubVue.getInstance(instanceName).clean(channel);
    };

    Vue.prototype.$pnRelease = function (channel, instanceName) {
      PubNubVue.getInstance(instanceName).release(channel);
    };
  },
  getInstance(instanceName) {
    return PubNubVue.getInstance(instanceName, _pnConfig);
  }
};
