import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Film from './Film'

configure({adapter: new Adapter()});

describe('<Film />', ()=>{
  it('should render Film panel', ()=>{
    const wrapper = shallow(<Film />);
    expect(wrapper.find())
  })
})