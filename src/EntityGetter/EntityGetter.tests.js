import expect from 'expect';
import EntityGetter from './index';

describe('EntityGetter', () => {
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

  describe('when entities are stored as an object', () => {
    const state = {
      entities: {
        jobs: {
          data: {
            entityToId: {
              1: job1,
              2: job2,
              3: job3,
            },
          },
        },
      },
    };

    const entitySelector = entityName => `entities.${entityName}.data.entityToId`;
    const getter = new EntityGetter(entitySelector);
    const entities = getter.getFrom(state, 'jobs');

    describe('#entities', () => {
      it('returns an array of entities in state', () => {
        expect(entities.entities).toEqual([job1, job2, job3]);
      });
    });

    describe('findBy', () => {
      it('finds the entity when comparing 1 attribute', () => {
        expect(entities.findBy({ id: 1 })).toEqual(job1);
      });

      it('finds the entity when comparing multiple attributes', () => {
        expect(entities.findBy({ title: 'My job', foo: 'bar' })).toEqual(job1);
        expect(entities.findBy({ title: 'My job', number: 11 })).toEqual(job2);
      });

      it('returns undefined when no entities match', () => {
        expect(entities.findBy({ something: 'wrong' })).toNotExist();
        expect(entities.findBy({ title: 'My job', foo: 'baz' })).toNotExist();
      });
    });

    describe('#where', () => {
      it('filters state when comparing 1 attribute', () => {
        expect(entities.where({ id: 1 })).toEqual([job1]);
      });

      it('filters state when comparing multiple attributes', () => {
        expect(entities.where({ title: 'My job', foo: 'bar' })).toEqual([job1, job2]);
        expect(entities.where({ title: 'My job', number: '11' })).toEqual([job2]);
        expect(entities.entities).toEqual([job1, job2, job3]);
      });

      it('returns an empty array when no entities match', () => {
        expect(entities.where({ something: 'wrong' })).toEqual([]);
        expect(entities.where({ title: 'My job', foo: 'baz' })).toEqual([]);
      });
    });
  });

  describe('state with entities stored as an array', () => {
    const state = {
      api: {
        data: {
          jobs: {
            data: [
              job1,
              job2,
              job3,
            ],
          },
        },
      },
    };

    const entitySelector = entityName => `api.data.${entityName}.data`;
    const getter = new EntityGetter(entitySelector);
    const entities = getter.getFrom(state, 'jobs');

    describe('#entities', () => {
      it('returns an array of entities in state', () => {
        expect(entities.entities).toEqual([job1, job2, job3]);
      });
    });

    describe('findBy', () => {
      it('finds the entity when comparing 1 attribute', () => {
        expect(entities.findBy({ id: 1 })).toEqual(job1);
      });

      it('finds the entity when comparing multiple attributes', () => {
        expect(entities.findBy({ title: 'My job', foo: 'bar' })).toEqual(job1);
        expect(entities.findBy({ title: 'My job', number: 11 })).toEqual(job2);
      });

      it('returns undefined when no entities match', () => {
        expect(entities.findBy({ something: 'wrong' })).toNotExist();
        expect(entities.findBy({ title: 'My job', foo: 'baz' })).toNotExist();
      });
    });

    describe('#where', () => {
      it('filters state when comparing 1 attribute', () => {
        expect(entities.where({ id: 1 })).toEqual([job1]);
      });

      it('filters state when comparing multiple attributes', () => {
        expect(entities.where({ title: 'My job', foo: 'bar' })).toEqual([job1, job2]);
        expect(entities.where({ title: 'My job', number: '11' })).toEqual([job2]);
        expect(entities.entities).toEqual([job1, job2, job3]);
      });

      it('returns an empty array when no entities match', () => {
        expect(entities.where({ something: 'wrong' })).toEqual([]);
        expect(entities.where({ title: 'My job', foo: 'baz' })).toEqual([]);
      });
    });
  });
});
