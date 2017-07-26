/* global describe it */
import { expect } from 'chai';

import createSelectors from '../src/create-selectors';

describe('createSelectors', () => {
  describe('given curried NAME and MODEL', () => {
    it('should return object with same keys as in MODEL', () => {
      const MOCK_MODEL = { a: 1, b: '2', c: i => i };
      const selectors = createSelectors('just-a-name')(MOCK_MODEL);

      expect(Object.keys(selectors)).to.deep.equal(Object.keys(MOCK_MODEL));
    });

    it('should return object with keys containing selector functions', () => {
      const STATE_NAME = 'test-state-name';
      const MOCK_MODEL = { a: 1, b: '2' };
      const MOCK_STATE = { [STATE_NAME]: MOCK_MODEL };

      const selectors = createSelectors(STATE_NAME)(MOCK_MODEL);

      Object
        .keys(selectors)
        .map(key =>
          expect(selectors[key](MOCK_STATE)).to.equal(MOCK_MODEL[key])
        );
    });
  });
});
