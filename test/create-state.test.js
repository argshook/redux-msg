/* global describe it */

import {expect} from 'chai';

import createState from '../src/create-state';

describe('createState', () => {
  it('should return function', () => {
    expect(createState).to.be.a('function');
  });

  describe('when called following `string -> defaultObject -> object` signature', () => {
    it('should return object with spread defaultObject & object nested within `string` key', () => {
      const string = 'name of state slice';
      const defaultObject = { key: 'value', key2: 'value2' };
      const object = { key3: 'value3' };

      expect(createState(string)(defaultObject)(object)).to.deep.equal({
        [string]: {
          ...defaultObject,
          ...object
        }
      });
    });
  });
});
