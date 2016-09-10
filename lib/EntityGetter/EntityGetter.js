'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityGetter = function EntityGetter(filterFunc, state) {
  (0, _classCallCheck3.default)(this, EntityGetter);

  _initialiseProps.call(this);

  this.entities = [];
  this.filterFunc = filterFunc;
  this.state = state;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.get = function (entityName) {
    var _filterEntities = _this._filterEntities;
    var filterFunc = _this.filterFunc;
    var state = _this.state;

    var pathToEntities = filterFunc(entityName);

    _this.entities = (0, _lodash.get)(state, pathToEntities);

    return {
      entities: (0, _lodash.values)(_this.entities),
      findBy: function findBy() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return (0, _lodash.first)(_filterEntities(options));
      },
      where: function where() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return _filterEntities(options);
      }
    };
  };

  this._filterEntities = function (options) {
    var filteredEntities = (0, _lodash.clone)(_this.entities);

    (0, _lodash.each)(options, function (attributeValue, attributeName) {
      filteredEntities = (0, _lodash.filter)(filteredEntities, function (entity) {
        var attribute = entity[attributeName];
        return String(attribute) === String(attributeValue);
      });
    });

    return filteredEntities;
  };
};

exports.default = function (filterFunction) {
  return function (state) {
    return new EntityGetter(filterFunction, state);
  };
};

module.exports = exports['default'];