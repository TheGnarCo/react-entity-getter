import expect from 'expect';
import EntitiesWrapper from './index';

describe('EntitiesWrapper', () => {
  const job1 = {
    id: 1,
    title: 'My job',
    foo: 'bar',
    number: 10,
  };
  const job2 = {
    id: 2,
    title: 'My job',
    foo: 'bar',
    number: 11,
  };
  const job3 = {
    id: 3,
    title: 'My other job',
    foo: 'baz',
    number: 10,
  };
  const entitiesWrapper = new EntitiesWrapper([job1, job2, job3]);

  describe('entities', () => {
    it('returns an array of entities', () => {
      expect(entitiesWrapper.entities).toEqual([job1, job2, job3]);
    });
  });

  describe('#findBy', () => {
    it('finds the entity when comparing 1 attribute', () => {
      expect(entitiesWrapper.findBy({ id: 1 })).toEqual(job1);
    });

    it('finds the entity when comparing multiple attributes', () => {
      expect(entitiesWrapper.findBy({ title: 'My job', foo: 'bar' })).toEqual(job1);
      expect(entitiesWrapper.findBy({ title: 'My job', number: 11 })).toEqual(job2);
    });

    it('returns undefined when no entities match', () => {
      expect(entitiesWrapper.findBy({ something: 'wrong' })).toNotExist();
      expect(entitiesWrapper.findBy({ title: 'My job', foo: 'baz' })).toNotExist();
    });
  });

  describe('#where', () => {
    it('filters state when comparing 1 attribute', () => {
      expect(entitiesWrapper.where({ id: 1 })).toEqual([job1]);
    });

    it('filters state when comparing multiple attributes', () => {
      expect(entitiesWrapper.where({ title: 'My job', foo: 'bar' })).toEqual([job1, job2]);
      expect(entitiesWrapper.where({ title: 'My job', number: '11' })).toEqual([job2]);
      expect(entitiesWrapper.entities).toEqual([job1, job2, job3]);
    });

    it('returns an empty array when no entities match', () => {
      expect(entitiesWrapper.where({ something: 'wrong' })).toEqual([]);
      expect(entitiesWrapper.where({ title: 'My job', foo: 'baz' })).toEqual([]);
    });
  });
});
