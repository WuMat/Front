import React, { Component } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';

import LoginPages from './components/wwPages/LoginPages/LoginPages';
import FilmsPages from './components/wwPages/FilmsPages/FilmsPages';
import AddFilm from './components/wwPages/AddFilmPage/AddFilmPage';
import PermissionComponent from './components/PersmissionComponent/PermissionComponent'
import AuthContext from './auth-context';



class App extends Component {
  state={
    isAuth: false
  }

  componentDidMount(){
    this.checkAuth()
  }

  loginHandler = () => {
    this.setState(prevState =>{
      return{
        isAuth: true
      }
    })
  }
  logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user')
    this.setState({
      isAuth: false
    })
  }
  checkAuth = () =>{
    const token = localStorage.getItem('token')
    if(!token){
      this.logoutHandler()
    }else{
      this.loginHandler()
    }
  }
 

  render() {

    return (
      <AuthContext.Provider 
      value={{
        isAuth: this.state.isAuth, 
        loginHandler: this.loginHandler, 
        logoutHandler: this.logoutHandler
      }}>
        <Switch>
          {this.state.isAuth ?
            <Redirect from='/login' to='/films' /> :
            <Route path='/login' exec component={LoginPages} />
          }
          <PermissionComponent>
            <Route path='/films' exec component={FilmsPages} />
            <Route path='/addfilm' exec component={AddFilm} />
          </PermissionComponent>
          <Redirect from='/' to='/login' />
        </Switch>
      </AuthContext.Provider>
    )
  }
}

export default App;
