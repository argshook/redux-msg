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
    it('should return correct action', () => {
      const msg = 'msg';
      expect(createMessage('stateName')(msg)).to.deep.equal({
        type: MESSAGE_TYPE,
        stateName: 'stateName',
        message: msg
      });
    });
  });
});
