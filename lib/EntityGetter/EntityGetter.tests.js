'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('EntityGetter', function () {
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

  describe('when entities are stored as an object', function () {
    var state = {
      entities: {
        jobs: {
          data: {
            entityToId: {
              1: job1,
              2: job2,
              3: job3
            }
          }
        }
      }
    };

    var entitySelector = function entitySelector(entityName) {
      return 'entities.' + entityName + '.data.entityToId';
    };
    var getter = (0, _index2.default)(entitySelector)(state);
    var entities = getter.get('jobs');

    describe('#entities', function () {
      it('returns an array of entities in state', function () {
        (0, _expect2.default)(entities.entities).toEqual([job1, job2, job3]);
      });
    });

    describe('findBy', function () {
      it('finds the entity when comparing 1 attribute', function () {
        (0, _expect2.default)(entities.findBy({ id: 1 })).toEqual(job1);
      });

      it('finds the entity when comparing multiple attributes', function () {
        (0, _expect2.default)(entities.findBy({ title: 'My job', foo: 'bar' })).toEqual(job1);
        (0, _expect2.default)(entities.findBy({ title: 'My job', number: 11 })).toEqual(job2);
      });

      it('returns undefined when no entities match', function () {
        (0, _expect2.default)(entities.findBy({ something: 'wrong' })).toNotExist();
        (0, _expect2.default)(entities.findBy({ title: 'My job', foo: 'baz' })).toNotExist();
      });
    });

    describe('#where', function () {
      it('filters state when comparing 1 attribute', function () {
        (0, _expect2.default)(entities.where({ id: 1 })).toEqual([job1]);
      });

      it('filters state when comparing multiple attributes', function () {
        (0, _expect2.default)(entities.where({ title: 'My job', foo: 'bar' })).toEqual([job1, job2]);
        (0, _expect2.default)(entities.where({ title: 'My job', number: '11' })).toEqual([job2]);
        (0, _expect2.default)(entities.entities).toEqual([job1, job2, job3]);
      });

      it('returns an empty array when no entities match', function () {
        (0, _expect2.default)(entities.where({ something: 'wrong' })).toEqual([]);
        (0, _expect2.default)(entities.where({ title: 'My job', foo: 'baz' })).toEqual([]);
      });
    });
  });

  describe('state with entities stored as an array', function () {
    var state = {
      api: {
        data: {
          jobs: {
            data: [job1, job2, job3]
          }
        }
      }
    };

    var entitySelector = function entitySelector(entityName) {
      return 'api.data.' + entityName + '.data';
    };
    var getter = (0, _index2.default)(entitySelector)(state);
    var entities = getter.get('jobs');

    describe('#entities', function () {
      it('returns an array of entities in state', function () {
        (0, _expect2.default)(entities.entities).toEqual([job1, job2, job3]);
      });
    });

    describe('findBy', function () {
      it('finds the entity when comparing 1 attribute', function () {
        (0, _expect2.default)(entities.findBy({ id: 1 })).toEqual(job1);
      });

      it('finds the entity when comparing multiple attributes', function () {
        (0, _expect2.default)(entities.findBy({ title: 'My job', foo: 'bar' })).toEqual(job1);
        (0, _expect2.default)(entities.findBy({ title: 'My job', number: 11 })).toEqual(job2);
      });

      it('returns undefined when no entities match', function () {
        (0, _expect2.default)(entities.findBy({ something: 'wrong' })).toNotExist();
        (0, _expect2.default)(entities.findBy({ title: 'My job', foo: 'baz' })).toNotExist();
      });
    });

    describe('#where', function () {
      it('filters state when comparing 1 attribute', function () {
        (0, _expect2.default)(entities.where({ id: 1 })).toEqual([job1]);
      });

      it('filters state when comparing multiple attributes', function () {
        (0, _expect2.default)(entities.where({ title: 'My job', foo: 'bar' })).toEqual([job1, job2]);
        (0, _expect2.default)(entities.where({ title: 'My job', number: '11' })).toEqual([job2]);
        (0, _expect2.default)(entities.entities).toEqual([job1, job2, job3]);
      });

      it('returns an empty array when no entities match', function () {
        (0, _expect2.default)(entities.where({ something: 'wrong' })).toEqual([]);
        (0, _expect2.default)(entities.where({ title: 'My job', foo: 'baz' })).toEqual([]);
      });
    });
  });
});