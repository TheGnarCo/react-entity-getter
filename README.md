# React Entity Getter

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

## Functions

### findBy

* Returns the first entity matching the attributes passed to the function.

Example:

```js
const user = stateEntityGetter(state).get('users').findBy({ isCurrentUser: true }); // returns a single User entity
const post = stateEntityGetter(state).get('posts').findBy({
  title: 'My post',
  published: true,
}); // returns a single Post entity
```

### where

* Returns an array of all entities matching the attributes passed to the function

Example:

```js
const entities = stateEntityGetter(state);
const user = entities.get('users').findBy({ isCurrentUser: true });
const post = entities.get('posts').findBy({ title: 'My post' });
const comments = entities.get('comments').where({
  post_id: post.id,
  user_id: user.id,
}); // returns an array of comments related to the post and user
```
