# React Entity Getter

[![npm version](https://badge.fury.io/js/react-entity-getter.svg)](https://badge.fury.io/js/react-entity-getter)
[![CircleCI](https://circleci.com/gh/TheGnarCo/react-entity-getter.svg?style=svg)](https://circleci.com/gh/TheGnarCo/react-entity-getter)

The React Entity Getter is a helper class with functions that assist in retrieving redux entitites from state.

This is particularly helpful for connected React components in the `mapStateToProps` function.

## Getting Started

1) Add this package to your package.json file.

```
$ npm install --save react-entity-getter
```

2) Create a utility file to hold your state entity getter.

3) In the utility file, create a function that returns a path to your entities in redux state.

```js
const pathToEntity = (entityName) => {
  return `api.data.${entityName}.data`;
};
```

4) In the utility file, import this package and create a new instance of the `EntityGetter` class, passing in your path to entities in redux state.

```js
// ./utilities/entityGetter.js
import entityGetter from 'react-entity-getter';

const pathToEntity = (entityName) => {
  return `api.data.${entityName}.data`;
};

export default entityGetter(pathToEntity);
```

5) In your connected React components, import your `entityGetter` utility.

```js
// ./pages/HomePage.jsx
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import entityGetter from '../utilities/entityGetter';

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  render () {
    const { user } = this.props;

    return (
      <div>Hello, {user.firstName}</div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = entityGetter(state).get('users').findBy({ isCurrentUser: true });

  return { user };
};

export default connect(mapStateToProps)(HomePage);
```

## Attributes

### entities

* Returns all entities of the `entityName` in redux state.

Example:

```js
const users = stateEntityGetter(state).get('users').entities;
```

## Functions

### findBy

```
findBy<A, B, C>(filters:A, options:B?) -> C?
```

* Returns the first entity matching the attributes passed to the function.

#### Options
* ignoreCase: matches the attribute value of an entity regardless of the case

#### Examples:

```js
const user = stateEntityGetter(state).get('users').findBy({ isCurrentUser: true }); // returns a single User entity
const post = stateEntityGetter(state).get('posts').findBy({
  title: 'My post',
  published: true,
}); // returns a single Post entity
```

```js
const users = stateEntityGetter(state).get('users');
const user = users.findBy({ first_name: 'mike' }, { ignoreCase: true }); // returns a single User entity
```

### where

```
where<A,B, C>(filters:A, options:B?) -> [C]
```

* Returns an array of all entities matching the attributes passed to the function.

#### Options
* ignoreCase: matches the attribute value of an entity regardless of the case

#### Examples:

```js
const entities = stateEntityGetter(state);
const user = entities.get('users').findBy({ isCurrentUser: true });
const post = entities.get('posts').findBy({ title: 'My post' });
const comments = entities.get('comments').where({
  post_id: post.id,
  user_id: user.id,
}); // returns an array of comments related to the post and user
const billUsers = entities.get('users').where({ first_name: 'bill' }, { ignoreCase: true });
```

## About The Gnar Company

![The Gnar Company](https://avatars0.githubusercontent.com/u/17011419?s=100&v=4)

The Gnar Company is a Boston-based development company that builds robust
web and mobile apps designed for the long haul.

For more information see [our website](https://www.thegnar.co/).
