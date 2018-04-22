/* global describe it */
import { expect } from 'chai';

import createReducer from '../src/create-reducer';

describe('createReducer', () => {
  describe('when called', () => {
    it('should return a function', () => {
      expect(createReducer()).to.be.a('function');
    });
  });

  describe('when called with curried state & "derivation" objects', () => {
    it('should return function with signature `(state, action) -> state`', () => {
      const state = { a: 1, b: 'Hello' };

      const actionType = 'some_action';
      const actionType2 = 'some_other_action';

      const action = { type: actionType };
      const action2 = { type: actionType2, payload: ' world!' };

      const derivations = {
        [actionType]: (state) => ({ ...state, a: state.a + 1 }),
        [actionType2]: (state, action) => ({ ...state, b: state.b + action.payload })
      };

      const reducer = createReducer(state)(derivations);
      const reducedState = reducer(reducer(state, action), action2);

      expect(reducedState.a).to.equal(2);
      expect(reducedState.b).to.equal('Hello world!');
    });
  });
});
