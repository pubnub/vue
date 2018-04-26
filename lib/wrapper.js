'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modules = require('./modules');

var _broadcast = require('./broadcast');

var _broadcast2 = _interopRequireDefault(_broadcast);

var _autoload = require('./autoload');

var _autoload2 = _interopRequireDefault(_autoload);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function wrapAttribute(originalInstance, wrappedInstance, attributeName) {
  wrappedInstance[attributeName] = originalInstance[attributeName];
}

function wrapMethod(OriginalInstance, wrappedInstance, methodName) {
  wrappedInstance[methodName] = function () {
    return OriginalInstance[methodName].apply(wrappedInstance, arguments);
  };
}

var _class = function () {
  function _class(originalInstance) {
    var _this = this;

    _classCallCheck(this, _class);

    this._originInstance = originalInstance;
    this._broadcast = new _broadcast2.default();
    this._autoload = new _autoload2.default(originalInstance);
    this._listener = {};
    this._data = { messages: {}, presence: {}, status: {} };
    this._keepMessages = {};

    _config2.default.attributes_to_delegate.forEach(function (attribute) {
      wrapAttribute(originalInstance, _this, attribute);
    });

    _config2.default.methods_to_delegate.forEach(function (method) {
      wrapMethod(originalInstance, _this, method);
    });

    this.clean = _modules.clean.bind(this);
    this.getMessage = _modules.getMessage.bind(this);
    this.getPresence = _modules.getPresence.bind(this);
    this.getStatus = _modules.getStatus.bind(this);
    this.release = _modules.release.bind(this);

    this.addListener(this._listener);
  }

  _createClass(_class, [{
    key: 'subscribe',
    value: function subscribe(args) {
      this.getOriginalInstance().subscribe(args);
      this._autoload.enableLoad(args);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(args) {
      this.getOriginalInstance().unsubscribe(args);
      this._autoload.disableLoad(args);
    }
  }, {
    key: 'getOriginalInstance',
    value: function getOriginalInstance() {
      if (this._originInstance) {
        return this._originInstance;
      } else {
        throw new ReferenceError('Pubnub default instance is not initialized yet');
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=wrapper.js.map
