import React, { useContext } from 'react'
import { UserContext } from './auth'


const Login = () => {
  const { login } = useContext(UserContext)

  return(
   <button style={{ right: 0, position: 'absolute' }} onClick={login}>
    Log In
  </button>
  )
  }

export default Login
