/* global describe it */
import { expect } from 'chai';

import messageType from '../src/message-type';

describe('MESSAGE', () => {
  it('should be, you know, MESSAGE, mkay', () => {
    expect(messageType).to.equal('MESSAGE');
  });
});
