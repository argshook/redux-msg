# Redux Msg [![Build Status](https://travis-ci.org/argshook/redux-msg.svg?branch=master)](https://travis-ci.org/argshook/redux-msg)

## `npm i redux-msg`

small set of functions to help DRY up your redux code:

```js
import {
    // helpers for regular redux
    createReducer,
    createSelectors,
    createState,

    // special actions called "messages" for advanced code DRYness
    createMessage,
    createMessagesReducer,
    mergeReducers
} from 'redux-msg';
```

example usage in [this repo](https://github.com/argshook/how-to-redux)

# Quick Start

## `createReducer`

if you code reducers with `switch`es or `if`s, this function is for you.

### Usage

`const reducer = createReducer(Model)(Derivations)` where:

* `Model` is a simple object of redux state. This elsewhere is sometimes called `initialState`
* `Derivations` is an object where:
  * `key` is action type (e.g. `COUNTER_INCREASE`)
  * `value` is function of signature `(state, action) => state`. This
  function is called when reducer is called with corresponding action in
  `key`. It receives current `state` and full `action` and must return
  new `state`.

### Return Value

a regular redux reducer with signature `(state, action) => state`. you
can use it with other redux tools with no problem.


### Example

```js
import { createReducer } from 'redux-msg';

export const MODEL = {
  count: 0
};

// action type
export const COUNTER_INCREASE = 'increase';
export const COUNTER_DECREASE = 'decrease';

// very simple redux actions
export const counterIncrease = () => ({ type: COUNTER_INCREASE });
export const counterDecrease = () => ({ type: COUNTER_DECREASE });

// reducer created with `createReducer`
export const reducer = createReducer(MODEL)({
  [COUNTER_INCREASE]: state => ({ ...state, count: state.count + 1 }),
  [COUNTER_DECREASE]: state => ({ ...state, count: state.count - 1 })
});
```

## `createSelectors`

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

however, this doesn't scale well: you need such function for each model property and it also needs to know full path to reach `count`.

by following simple convention to name your components, you can
automatically create such select functions with `createSelectors`
without the need to know path to properties.

`createSelectors(Name)(Model)` where:

* `Name` is a string labeling your component. This should also be part of `combineReducers()`:

    ```js
    import counterLogic from 'components/counter/logic';
    import todoLogic from 'components/todo/logic';

    combineReducers({
      [counterLogic.NAME]: counterLogic.reducer,
      [todoLogic.NAME]: todoLogic.reducer
    });
    ```

    > a `Name` defined once for each redux state section is also useful
    > for other helper functions in this library.

* `Model` is a simple object of redux state. This elsewhere is sometimes called `initialState`

### Return Value

object with keys that are the same as in given `Model`. values are
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

export const selectors = createSelectors('counterComponent')(MODEL);

assert.deepEqual(Object.keys(selectors), Object.keys(MODEL)) // just to illustrate that both have same keys

console.log(selectors.count(store.getState())) // <= 0
console.log(selectors.message(store.getState())) // <= 'hello there!'
```

this fits really well within `react-redux` `mapStateToProps`:

`component.js`:
```js
import { selectors } from './logic';
const mapStateToProps = state => ({
  count: selectors.count(state)
});
// ...
```

### Example

```js
import { createSelectors } from 'redux-msg';

export const NAME = 'counterComponent';

export const MODEL = {
  count: 0
};

export const selectors = createSelectors(NAME)(MODEL);
```

it can be combined with other selectors easily:

```js
export const selectors = {
  ...createSelectors(NAME)(MODEL),
  myOtherSelector: state => state[NAME].specialItem
}
```
