import expect from 'expect';
import entityGetter from './index';
import EntitiesWrapper from '../EntitiesWrapper';

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
    const getter = entityGetter(entitySelector)(state);
    const entities = getter.get('jobs');

    it('returns an EntitiesWrapper object', () => {
      expect(entities).toBeAn(EntitiesWrapper);
    });

    describe('#entities', () => {
      it('returns an array of entities in state', () => {
        expect(entities.entities).toEqual([job1, job2, job3]);
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
    const getter = entityGetter(entitySelector)(state);
    const entities = getter.get('jobs');

    it('returns an EntitiesWrapper object', () => {
      expect(entities).toBeAn(EntitiesWrapper);
    });

    describe('#entities', () => {
      it('returns an array of entities in state', () => {
        expect(entities.entities).toEqual([job1, job2, job3]);
      });
    });
  });
});
