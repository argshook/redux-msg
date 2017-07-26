/* global describe it */
import { expect } from 'chai';

import messageType from '../src/message-type';

describe('message type', () => {
  it('should be expected string', () => {
    expect(messageType).to.equal('@@MSG');
  });
});
