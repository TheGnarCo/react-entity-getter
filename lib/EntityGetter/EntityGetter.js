'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

var _EntitiesWrapper = require('../EntitiesWrapper');

var _EntitiesWrapper2 = _interopRequireDefault(_EntitiesWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityGetter = function EntityGetter(filterFunc, state) {
  (0, _classCallCheck3.default)(this, EntityGetter);

  _initialiseProps.call(this);

  this.filterFunc = filterFunc;
  this.state = state;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.get = function (entityName) {
    var filterFunc = _this.filterFunc;
    var state = _this.state;

    var pathToEntities = filterFunc(entityName);
    var stateEntities = (0, _lodash.get)(state, pathToEntities);
    var entities = (0, _lodash.values)(stateEntities);

    return new _EntitiesWrapper2.default(entities);
  };
};

exports.default = function (filterFunction) {
  return function (state) {
    return new EntityGetter(filterFunction, state);
  };
};

module.exports = exports['default'];