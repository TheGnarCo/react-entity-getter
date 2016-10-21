import { clone, each, filter, first } from 'lodash';

class EntitiesWrapper {
  constructor (entities = []) {
    this.entities = entities;
  }

  findBy = (options = {}) => {
    return first(this._filterEntities(options));
  }

  where = (options = {}) => {
    return this._filterEntities(options);
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

export default EntitiesWrapper;
