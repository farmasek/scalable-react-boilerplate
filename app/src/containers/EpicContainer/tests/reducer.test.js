import expect from 'expect';
import * as types from '../constants';
import epicReducer, { initialState } from '../reducer';

describe('epicReducer', () => {
  it('returns the initial state', () => {
    expect(
      epicReducer(undefined, {})
    ).toEqual(initialState);
  });
});
