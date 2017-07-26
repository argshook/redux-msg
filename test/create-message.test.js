/* global describe it */
import { expect } from 'chai';

import createMessage from '../src/create-message';
import MESSAGE_TYPE from '../src/message-type';

describe('createMessage', () => {
  describe('given string', () => {
    it('should return function', () => {
      expect(typeof createMessage('string')).to.equal('function');
    });
  });

  describe('given curried string and message', () => {
    const MSG = 'msg';
    const STATE_NAME = 'stateName';

    it('should return correct action', () => {
      expect(createMessage(STATE_NAME)(MSG)).to.deep.equal({
        type: MESSAGE_TYPE,
        stateName: STATE_NAME,
        message: MSG
      });
    });

    describe('with messageName', () => {
      it('should return correct action with adjusted type', () => {
        expect(createMessage(STATE_NAME)(MSG, 'hello!')).to.deep.equal({
          type: MESSAGE_TYPE + '/hello!',
          stateName: STATE_NAME,
          message: MSG
        });
      });
    });
  });
});
