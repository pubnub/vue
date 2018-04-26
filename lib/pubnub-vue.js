'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pubnub = require('pubnub');

var _pubnub2 = _interopRequireDefault(_pubnub);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = {};

var PubNubVue = function () {
  function PubNubVue() {
    _classCallCheck(this, PubNubVue);
  }

  _createClass(PubNubVue, null, [{
    key: 'getInstance',
    value: function getInstance(instanceName, initConfig) {
      if (typeof instanceName === 'string' && instanceName.length > 0) {
        if (instanceName in instances) {
          return instances[instanceName];
        } else {
          instances[instanceName] = new _wrapper2.default(new _pubnub2.default(initConfig));
          return instances[instanceName];
        }
      } else if (!(_config2.default.default_instance_name in instances)) {
        instances[_config2.default.default_instance_name] = new _wrapper2.default(new _pubnub2.default(initConfig));
        return instances[_config2.default.default_instance_name];
      } else {
        return this.getDefaultInstance();
      }
    }
  }, {
    key: 'getDefaultInstance',
    value: function getDefaultInstance() {
      return instances[_config2.default.default_instance_name];
    }
  }]);

  return PubNubVue;
}();

exports.default = PubNubVue;
module.exports = exports['default'];
//# sourceMappingURL=pubnub-vue.js.map
