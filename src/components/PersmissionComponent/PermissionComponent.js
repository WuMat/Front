import React from 'react'
import AuthContext from '../../auth-context';
import {Redirect} from 'react-router-dom'

class PermissionComponent extends React.PureComponent{
  static contextType = AuthContext;

  render(){
    return(
      <>{this.context.isAuth ? this.props.children : <Redirect to='/login'/>}</>
    )
  }
}

export default PermissionComponent