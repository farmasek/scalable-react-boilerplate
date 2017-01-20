import expect from 'expect';
import * as actions from '../actions';
import * as types from '../constants';

describe('Epic actions', () => {
  it('has a type of EPIC_DEFAULT_ACTION', () => {
    const expected = {
      type: types.EPIC_DEFAULT_ACTION,
    };
    expect(actions.epicDefaultAction()).toEqual(expected);
  });
});
