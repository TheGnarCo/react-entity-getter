import { clone, each, filter, first, get as _get, values } from 'lodash';

class EntityGetter {
  constructor (filterFunc, state) {
    this.entities = [];
    this.filterFunc = filterFunc;
    this.state = state;
  }

  get = (entityName) => {
    const { _filterEntities, filterFunc, state } = this;
    const pathToEntities = filterFunc(entityName);

    this.entities = _get(state, pathToEntities);

    return {
      entities: values(this.entities),
      findBy: (options = {}) => {
        return first(_filterEntities(options));
      },
      where: (options = {}) => {
        return _filterEntities(options);
      },
    };
  }

  _filterEntities = (options) => {
    let filteredEntities = clone(this.entities);

    each(options, (attributeValue, attributeName) => {
      filteredEntities = filter(filteredEntities, (entity) => {
        const attribute = entity[attributeName];
        return String(attribute) === String(attributeValue);
      });
    });

    return filteredEntities;
  }
}

export default (filterFunction) => {
  return (state) => {
    return new EntityGetter(filterFunction, state);
  };
};
