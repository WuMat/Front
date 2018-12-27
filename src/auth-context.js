import React from 'react'

export const AuthContext = React.createContext({
  isAuth: false,
  loginHandler: ()=>{},
  logoutHandler: ()=>{}
  });


export default AuthContext