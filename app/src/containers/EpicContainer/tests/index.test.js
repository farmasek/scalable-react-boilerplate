import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { spy } from 'sinon';
import { initialState as epic } from '../reducer';
import EpicContainer from '../index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Epic />', () => {
  it('should render with default props', () => {
    const store = mockStore({ epic });
    const wrapper = shallow(
      <EpicContainer store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
