/* global describe it */

import { expect } from 'chai';
import mergeReducers from '../src/merge-reducers';

describe('mergeReducers', () => {
  it('should be a function', () => {
    expect(mergeReducers).to.be.a('function');
  });

  describe('when called with nothing', () => {
    it('should return function', () => {
      expect(mergeReducers()).to.be.a('function');
    });
  });

  describe('when called with one reducer', () => {
    it('should return reducer function', () => {
      const reducer = () => 'hello from reducer';
      const mergedReducers = mergeReducers(reducer);
      expect(mergedReducers()).to.equal('hello from reducer');
    });

    it('should return reducer that can apply action', () => {
      const reducer = (state, action) => {
        if (action.type === 'test') {
          return 'new state';
        }
        return state;
      };

      const initialState = 'old state';
      const action = { type: 'test' };

      const mergedReducers = mergeReducers(reducer);
      const newState = mergedReducers(initialState, action);
      expect(newState).to.equal('new state');
    });
  });

  describe('when called with two reducers', () => {
    it('should apply action to both reducers', () => {
      const reducer = state => ({ ...state, a: state.a + 1 });
      const reducer2 = state => ({ ...state, b: state.b + ' world!'});

      const initialState = { a: 0, b: 'Hello' };
      const mergedReducers = mergeReducers(reducer, reducer2);
      const newState = mergedReducers(initialState);
      expect(newState).to.deep.equal({a: 1, b: 'Hello world!'});
    });
  });
});
