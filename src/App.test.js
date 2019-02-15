import React from 'react'
import {Route, Switch, Redirect } from 'react-router-dom';

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {App} from './App'
import LoginPages from './components/wwPages/LoginPages/LoginPages';
import AddFilm from './components/wwPages/AddFilmPage/AddFilmPage';
import PermissionComponent from './components/PersmissionComponent/PermissionComponent'



configure({adapter: new Adapter()});
let wrapper;
beforeEach(()=>{
  wrapper = shallow(<App/>);

})
describe('<App />', ()=>{
  it('should render APP', ()=>{
    expect(wrapper.find(LoginPages))
  });

  it('should render APP', ()=>{
    wrapper.state({isAuth: false})
    expect(wrapper.find(<Route path='/films' exec component={AddFilm} />))
  })
})