/* global describe it */
import { expect } from 'chai';

import createMessagesReducer from '../src/create-messages-reducer';
import createMessage from '../src/create-message';


const STATE_NAME = 'test-state-name';
const MODEL = { a: 1, b: '2' };
const stateMessage = createMessage(STATE_NAME);
const message = state => Object.assign({}, state, { a: 2 });
const reducer = createMessagesReducer(STATE_NAME)(MODEL);
const expectedState = { a: 2, b: '2' };

describe('createMessagesReducer', () => {
  describe('given curried stateName and model', () => {
    it('should return reducer that handles messages', () => {
      expect(reducer(MODEL, stateMessage(message))).to.deep.equal(expectedState);
    });
  });
});

describe('messagesReducer from createMessagesReducer', () => {
  it('should handle messages with extended type', () => {
    expect(reducer(MODEL, stateMessage(message, 'hello'))).to.deep.equal(expectedState);
  });
});
