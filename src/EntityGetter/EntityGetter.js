import { get as _get, values } from 'lodash';

import EntitiesWrapper from '../EntitiesWrapper';

class EntityGetter {
  constructor (filterFunc, state) {
    this.filterFunc = filterFunc;
    this.state = state;
  }

  get = (entityName) => {
    const { filterFunc, state } = this;
    const pathToEntities = filterFunc(entityName);
    const stateEntities = _get(state, pathToEntities);
    const entities = values(stateEntities);

    return new EntitiesWrapper(entities);
  }
}

export default (filterFunction) => {
  return (state) => {
    return new EntityGetter(filterFunction, state);
  };
};
