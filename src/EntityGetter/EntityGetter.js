import { get as _get, values } from 'lodash';

import EntitiesWrapper from '../EntitiesWrapper';

class EntityGetter {
  constructor (filterFunc, state) {
    this.entities = [];
    this.filterFunc = filterFunc;
    this.state = state;
  }

  get = (entityName) => {
    const { filterFunc, state } = this;
    const pathToEntities = filterFunc(entityName);

    const stateEntities = _get(state, pathToEntities);
    this.entities = values(stateEntities);

    return new EntitiesWrapper(this.entities);
  }
}

export default (filterFunction) => {
  return (state) => {
    return new EntityGetter(filterFunction, state);
  };
};
