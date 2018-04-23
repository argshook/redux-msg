/* global describe it */
import { expect } from 'chai';

import createMessage from '../src/create-message';
import MESSAGE_TYPE from '../src/message-type';

describe('createMessage', () => {
  describe('given string', () => {
    it('should return function', () => {
      expect(createMessage('string')).to.be.a('function');
    });
  });

  describe('given curried string and message', () => {
    const MSG = 'msg';
    const STATE_NAME = 'stateName';

    it('should return object of expected shape', () => {
      expect(createMessage(STATE_NAME)(MSG)).to.deep.equal({
        type: `${MESSAGE_TYPE}/${STATE_NAME}`,
        stateName: STATE_NAME,
        message: MSG
      });
    });

    describe('with messageName', () => {
      it('should return correct action with adjusted type', () => {
        expect(createMessage(STATE_NAME)(MSG, 'hello!')).to.deep.equal({
          type: `${MESSAGE_TYPE}/${STATE_NAME}/hello!`,
          stateName: STATE_NAME,
          message: MSG
        });
      });
    });
  });
});
