import React, { useContext } from 'react'
import { AffiliateContext } from './affiliate'
import { UserContext } from './auth'


const Login = () => {
  const { user, login, logout } = useContext(UserContext)
  const { affiliateColor } = useContext(AffiliateContext)
  return (
    <div className="Login">

      {!user ? <button className="button" style={{ backgroundColor: affiliateColor }} onClick={login}>
        Log In
  </button> :
        <button className="button" style={{ backgroundColor: affiliateColor }} onClick={logout}>
          Log Out
</button>}
    </div>
  )
}

export default Login
