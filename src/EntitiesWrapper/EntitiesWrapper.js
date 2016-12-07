import { clone, each, filter, first } from 'lodash';

class EntitiesWrapper {
  constructor (entities = []) {
    this.entities = entities;
  }

  findBy = (filters = {}, options = {}) => {
    return first(this._filterEntities(filters, options));
  }

  where = (filters = {}, options = {}) => {
    return this._filterEntities(filters, options);
  }

  _filterEntities = (filters, options) => {
    let filteredEntities = clone(this.entities);
    const { ignoreCase } = options;

    each(filters, (attributeValue, attributeName) => {
      filteredEntities = filter(filteredEntities, (entity) => {
        const attribute = entity[attributeName];

        if (ignoreCase) {
          return String(attribute).toLowerCase() === String(attributeValue).toLowerCase();
        }

        return String(attribute) === String(attributeValue);
      });
    });

    return filteredEntities;
  }
}

export default EntitiesWrapper;
