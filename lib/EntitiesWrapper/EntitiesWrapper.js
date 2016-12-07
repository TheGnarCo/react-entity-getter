'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntitiesWrapper = function EntitiesWrapper() {
  var _this = this;

  var entities = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  (0, _classCallCheck3.default)(this, EntitiesWrapper);

  this.findBy = function () {
    var filters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return (0, _lodash.first)(_this._filterEntities(filters, options));
  };

  this.where = function () {
    var filters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return _this._filterEntities(filters, options);
  };

  this._filterEntities = function (filters, options) {
    var filteredEntities = (0, _lodash.clone)(_this.entities);
    var ignoreCase = options.ignoreCase;


    (0, _lodash.each)(filters, function (attributeValue, attributeName) {
      filteredEntities = (0, _lodash.filter)(filteredEntities, function (entity) {
        var attribute = entity[attributeName];

        if (ignoreCase) {
          return String(attribute).toLowerCase() === String(attributeValue).toLowerCase();
        }

        return String(attribute) === String(attributeValue);
      });
    });

    return filteredEntities;
  };

  this.entities = entities;
};

exports.default = EntitiesWrapper;
module.exports = exports['default'];