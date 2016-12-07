'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('EntitiesWrapper', function () {
  var job1 = {
    id: 1,
    title: 'My job',
    foo: 'bar',
    number: 10
  };
  var job2 = {
    id: 2,
    title: 'My job',
    foo: 'bar',
    number: 11
  };
  var job3 = {
    id: 3,
    title: 'My other job',
    foo: 'baz',
    number: 10
  };
  var entitiesWrapper = new _index2.default([job1, job2, job3]);

  describe('entities', function () {
    it('returns an array of entities', function () {
      (0, _expect2.default)(entitiesWrapper.entities).toEqual([job1, job2, job3]);
    });
  });

  describe('#findBy', function () {
    it('finds the entity when comparing 1 attribute', function () {
      (0, _expect2.default)(entitiesWrapper.findBy({ id: 1 })).toEqual(job1);
    });

    it('finds the entity when comparing multiple attributes', function () {
      (0, _expect2.default)(entitiesWrapper.findBy({ title: 'My job', foo: 'bar' })).toEqual(job1);
      (0, _expect2.default)(entitiesWrapper.findBy({ title: 'My job', number: 11 })).toEqual(job2);
    });

    it('returns undefined when no entities match', function () {
      (0, _expect2.default)(entitiesWrapper.findBy({ something: 'wrong' })).toNotExist();
      (0, _expect2.default)(entitiesWrapper.findBy({ title: 'My job', foo: 'baz' })).toNotExist();
    });

    describe('ignore case option', function () {
      it('does not ignore case by default', function () {
        (0, _expect2.default)(entitiesWrapper.findBy({ title: 'my job' })).toNotExist();
      });

      it('ignore cases when specified', function () {
        (0, _expect2.default)(entitiesWrapper.findBy({ title: 'my job' }, { ignoreCase: true })).toEqual(job1);
      });
    });
  });

  describe('#where', function () {
    it('filters state when comparing 1 attribute', function () {
      (0, _expect2.default)(entitiesWrapper.where({ id: 1 })).toEqual([job1]);
    });

    it('filters state when comparing multiple attributes', function () {
      (0, _expect2.default)(entitiesWrapper.where({ title: 'My job', foo: 'bar' })).toEqual([job1, job2]);
      (0, _expect2.default)(entitiesWrapper.where({ title: 'My job', number: '11' })).toEqual([job2]);
      (0, _expect2.default)(entitiesWrapper.entities).toEqual([job1, job2, job3]);
    });

    it('returns an empty array when no entities match', function () {
      (0, _expect2.default)(entitiesWrapper.where({ something: 'wrong' })).toEqual([]);
      (0, _expect2.default)(entitiesWrapper.where({ title: 'My job', foo: 'baz' })).toEqual([]);
    });

    describe('ignore case option', function () {
      it('does not ignore case by default', function () {
        (0, _expect2.default)(entitiesWrapper.where({ title: 'my job' })).toEqual([]);
      });

      it('ignore cases when specified', function () {
        (0, _expect2.default)(entitiesWrapper.where({ title: 'my job' }, { ignoreCase: true })).toEqual([job1, job2]);
      });
    });
  });
});