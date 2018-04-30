# Redux Msg [![Build Status](https://travis-ci.org/argshook/redux-msg.svg?branch=master)](https://travis-ci.org/argshook/redux-msg)

## `npm i redux-msg`

small set of functions to help DRY redux code:

```js
import {
  // helpers for regular redux
  createReducer,
  createSelector,
  createState,

  // special actions called "messages" for advanced code DRYness
  createMessage,
  createMessagesReducer,
  mergeReducers
} from 'redux-msg';
```

928 bytes in total (gzipped), 0 dependencies, 100% satisfaction

usage examples in [this repo](https://github.com/argshook/how-to-redux)

# Motivation

Redux is great but applications written using it tend to attract
boilerplate code.

Not much is needed to avoid this: only 3 tiny helper functions for
starters, or additional 3 (also tiny) functions if you can handle a little
convention.

# Convention

your redux-aware components should have:

* `NAME` - `string` a unique name of component. easily changeable when needed
* `MODEL` - `object` the shape of state
* that's it

that's no magic, just:
```js
export const NAME = 'my awesome unique name'
export const MODEL = { woodoo: true, greeting: 'Howdy', randomNumber: 4 }
```

this convention is helpful even without any of the helper functions suggested here.

# API

all 6 exported functions are explained below starting from simplest

## `createReducer`

`const { createReducer } = require('redux-msg')`

if you code reducers with `switch`es or `if`s, this function is for you.

### Usage

```js
const { createReducer } = require('redux-msg');
const reducer = createReducer(MODEL)(reducers)`
```

where:

* `MODEL` is an `object` of redux state
* `reducers` is an `object` where:
  * `key` is action type (e.g. `COUNTER_INCREASE`)
  * `value` is a reducer function of signature `(state, action) => state`.

so instead of this:

```js
const reducer = (state, action) => {
  switch(action.type) {
    'increase':
      return { ...state, count: state.count + 1 }
  }
}
```

you can do this:

```js
const MODEL = { count: 0 }
const reducer = createReducer(MODEL)({
  increase: state => ({...state, count: state + 1})
})
```

### Return Value

`createReducer(MODEL)(reducers)` returns yet another reducer with
signature `(state, action) => state`. This means that it can be used
with other redux tools with no problem.


### Example

```js
import { createReducer } from 'redux-msg';

export const MODEL = {
  count: 0
};

// reducer created with `createReducer`
export const reducer = createReducer(MODEL)({
  increase: state => ({ ...state, count: state.count + 1 }),
  setCount: (state, action) => ({ ...state, count: action.count })
});

// ... later

dispatch({ type: 'increase' });
// state is now { count: 1 }
dispatch({ type: 'setCount', count: 10 });
// state is now { count: 10 }
```

---

## `createSelector`

`const { createSelector } = require('redux-msg')`

when you have state, you want to be able to read it easily. easily means
from anywhere and always the same way.

let's consider bad approach for a moment.

imagine your `store.getState()` returns:

```js
{
  counterComponent: {
    count: 0
  }
}
```

you can create function
```js
const selectCount = state => state.counterComponent.count;
```

then call it somewhere else
```js
selectCount(store.getState()) // <= 0
```

however, this doesn't scale well: you need such function for each model
property and it also needs to know full path to reach `count`.

by following simple convention to name your components, you can
automatically create such select functions with `createSelector`
without the need to know path to properties.

`createSelector(NAME)(MODEL)` where:

* `NAME` is a `string` labeling your component. This should also be part of `combineReducers()`:

```js
import counterLogic from 'components/counter/logic';
import todoLogic from 'components/todo/logic';

combineReducers({
  [counterLogic.NAME]: counterLogic.reducer,
  [todoLogic.NAME]: todoLogic.reducer
});
```

> a `NAME` defined once for each redux state section is also useful
> for other helper functions in this library.

* `MODEL` is an `object` of redux state

### Return Value

object with keys that are the same as in given `MODEL`. values are
functions of signature `state => any`, where `state` is
`store.getState()` and `any` is whatever type that slice of state is.

For example:

`logic.js`:

```js
const NAME = 'counterComponent';
const MODEL = {
  count: 0,
  message: 'hello there!'
};

export const select = createSelector(NAME)(MODEL);

assert.deepEqual(Object.keys(selectors), Object.keys(MODEL)) // just to illustrate that both have same keys

console.log(select.count(store.getState())) // <= 0
console.log(select.message(store.getState())) // <= 'hello there!'
```

this fits really well with `react-redux` `mapStateToProps`:

`component.js`:

```js
import { select } from './logic';

const mapStateToProps = state => ({
  count: select.count(state)
});
```

### Example

```js
import { createSelector } from 'redux-msg';

export const NAME = 'counterComponent';

export const MODEL = {
  count: 0
};

export const selector = createSelector(NAME)(MODEL);
```

it can be combined with other selectors easily:

```js
export const selectors = {
  ...createSelector(NAME)(MODEL),
  myOtherSelector: state => state[NAME].specialItem
}
```

---

## `createState`

`const { createState } = require('redux-msg')`

helper to create a slice of global state for specific component.

can be used as a state "factory", to hydrate `createStore` when loading
component dynamically or during server side rendering.

can also be used as utility in tests.

### Usage

`const initState = createState(NAME)(MODEL)` where:

* `NAME` is a `string` labeling your component. This should also be part of `combineReducers()`. See `createSelector` for more details
* `MODEL` is an `object` of redux state

### Return Value

a function with signature `object -> { [NAME]: { ...MODEL, object }  }`.
That's pretty much the actual implementation.

`createState(NAME)(MODEL)` returns function that accepts `object` and
returns `state`. The returned `state` has key `name` and its value is
shallowly merged `MODEL` and `object`.

Code explains better than i do, please see example.

### Example

`myComponent/redux.js`:

```js
import { createState } from 'redux-msg';

const NAME = 'myComponent';
const MODEL = {
  default: 'property',
  something: 'i am some default value'
};

export const state = createState(NAME)(MODEL);
```


`create-store.js`:

`createStore` from `redux` accepts second parameter - initial state.
this is where `createState` may be used

```js
import { createStore, combineReducers } from 'redux';
import myComponent from 'myComponent/redux';

const store = createStore(
  combineReducers({
    [myComponent.NAME]: myComponent.reducer
  }),
  {
    ...createMyComponentState({ something: 'i am NOT default haha!' })
  })
```

after this, `store.getState()` will return:

```js
{
  'myComponent': {
    default: 'property'
    something: 'i am NOT default haha!'
  }
}
```

---
