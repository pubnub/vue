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

    Vue.prototype.$pn_getMessage = function (channel, callback, instanceName) {
      return PubNubVue.getInstance(instanceName).getMessage(channel, callback);
    };

    Vue.prototype.$pn_getPresence = function (channel, callback, instanceName) {
      return PubNubVue.getInstance(instanceName).getPresence(channel, callback);
    };

    Vue.prototype.$pn_getStatus = function (callback, instanceName) {
      return PubNubVue.getInstance(instanceName).getStatus(callback);
    };

    Vue.prototype.$pn_subscribe = function (args, instanceName) {
      PubNubVue.getInstance(instanceName).subscribe(args);
    };

    Vue.prototype.$pn_unsubscribe = function (args, instanceName) {
      PubNubVue.getInstance(instanceName).unsubscribe(args);
    };

    Vue.prototype.$pn_publish = function (args, callback, instanceName) {
      return PubNubVue.getInstance(instanceName).publish(args, callback);
    };

    Vue.prototype.$pn_clean = function (channel, instanceName) {
      PubNubVue.getInstance(instanceName).clean(channel);
    };

    Vue.prototype.$pn_release = function (channel, instanceName) {
      PubNubVue.getInstance(instanceName).release(channel);
    };
  },
  getInstance(name) {
    return PubNubVue.getInstance(name, _pnConfig);
  }
};
