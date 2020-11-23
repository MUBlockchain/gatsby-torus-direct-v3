import React, { useContext } from 'react'
import { UserContext } from './auth'


const Login = () => {
  const { user, login, logout } = useContext(UserContext)

  return(
    <div className="Login">

   {!user ? <button className="button" onClick={login}>
    Log In
  </button> : 
  <button className="button" onClick={logout}>
  Log Out
</button> }
  </div>
  )
  }

export default Login
