/**
  * helper to create a slice of global state for specific component
  * 
  * useful when you do createStore and want to pass some initial state to some component.
  * or can be used in tests to quickly create state for testing selectors, for example.
  *
  * myComponent/redux.js:
  *
  * import { createState } from 'redux-msg';
  *
  * const NAME = 'myComponent';
  * const MODEL = {
  *   default: 'property',
  *   something: ''
  * };
  * export const state = createState(NAME)(MODEL);
  * export const reducer = ... // regular reducer
  *
  *
  * create-store.js:
  *
  * import { createStore, combineReducers } from 'redux';
  * import myComponent from 'myComponent/redux';
  *
  * const store = createStore(
  *   combineReducers({
  *    [myComponent.NAME]: myComponent.reducer
  *   }),
  *   {
  *     ...createMyComponentState({ something: 'non default haha!' })
  *   })
  *
  *
  * after this, store.getState() will return:
  *
  * {
  *   'myComponent': {
  *     default: 'property'
  *     something: 'non default haha!'
  *   }
  * }
  *
  * p.s. this is rather quick and dirty, i found a pattern in my use
  * cases and so added this helper here for reusability
  */

// createState : NAME -> defaultModel -> model -> model
export default (name = '') =>
  (defaultModel = {}) =>
    (model = {}) =>
      ({
        [name]: {
          ...defaultModel,
          ...model
        }
      });
