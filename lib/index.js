'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pubnubVue = require('./pubnub-vue');

var _pubnubVue2 = _interopRequireDefault(_pubnubVue);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _pnConfig = {};

exports.default = {
  install: function install(Vue, pnConfig) {
    Vue.mixin({
      created: function created() {
        _pnConfig = pnConfig;
        _pubnubVue2.default.getInstance(_config2.default.default_instance_name, _pnConfig);
      }
    });

    Vue.prototype.$pnGetInstance = function (instanceName) {
      return _pubnubVue2.default.getInstance(instanceName, _pnConfig);
    };

    Vue.prototype.$pnGetMessage = function (channel, callback, keepMessages, instanceName) {
      return _pubnubVue2.default.getInstance(instanceName).getMessage(channel, callback, keepMessages);
    };

    Vue.prototype.$pnGetPresence = function (channel, callback, instanceName) {
      return _pubnubVue2.default.getInstance(instanceName).getPresence(channel, callback);
    };

    Vue.prototype.$pnGetStatus = function (callback, instanceName) {
      return _pubnubVue2.default.getInstance(instanceName).getStatus(callback);
    };

    Vue.prototype.$pnSubscribe = function (args, instanceName) {
      _pubnubVue2.default.getInstance(instanceName).subscribe(args);
    };

    Vue.prototype.$pnUnsubscribe = function (args, instanceName) {
      _pubnubVue2.default.getInstance(instanceName).unsubscribe(args);
    };

    Vue.prototype.$pnPublish = function (args, callback, instanceName) {
      return _pubnubVue2.default.getInstance(instanceName).publish(args, callback);
    };

    Vue.prototype.$pnClean = function (channel, instanceName) {
      _pubnubVue2.default.getInstance(instanceName).clean(channel);
    };

    Vue.prototype.$pnRelease = function (channel, instanceName) {
      _pubnubVue2.default.getInstance(instanceName).release(channel);
    };
  },
  getInstance: function getInstance(instanceName) {
    return _pubnubVue2.default.getInstance(instanceName, _pnConfig);
  }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
