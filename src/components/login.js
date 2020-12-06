import React, { useContext } from 'react'
import { AssociateContext } from './associate'
import { UserContext } from './auth'


const Login = () => {
  const { user, login, logout } = useContext(UserContext)
  const { associateColor } = useContext(AssociateContext)
  return(
    <div className="Login">

   {!user ? <button className="button" style={{backgroundColor: associateColor}} onClick={login}>
    Log In
  </button> : 
  <button className="button" style={{backgroundColor: associateColor}} onClick={logout}>
  Log Out
</button> }
  </div>
  )
  }

export default Login
