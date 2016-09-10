import { clone, each, filter, first, get, values } from 'lodash';

export default class EntityGetter {
  constructor (filterFunc) {
    this.filterFunc = filterFunc;
    this.entities = [];
  }

  getFrom = (state, entityName) => {
    const { _filterEntities, filterFunc } = this;
    const pathToEntities = filterFunc(entityName);

    this.entities = get(state, pathToEntities);

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
