import React, { useState, useEffect } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

const DEFAULT_AUTH_CONTEXT = {
    user: null,
    loading: null,
    login: null
}

export let UserContext = React.createContext(DEFAULT_AUTH_CONTEXT)

export default function AuthContextProvider ({ children }) {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState('')

    useEffect(() => {
        console.log('Torus', torus)
    }, [])

 const torus = new DirectWebSdk({
    baseUrl: 'http://localhost:8000/serviceworker/',
    // proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
    // network: 'ropsten', // details for test net,
    enableLogging: true
  })

  const initTorus = async () => {
    await torus.init()
  }

  const login = async () => {
  
    await initTorus()
  
    const userInfo = await torus.triggerLogin({
      verifier: process.env.GATSBY_VERIFIER_NAME,
      typeOfLogin: 'google',
      clientId: process.env.GATSBY_GOOGLE_CLIENT_ID
    })

    const { publicAddress, privateKey, userInfo: info } = userInfo
    const { email, name, profileImage } = info
    setUser({publicAddress, privateKey, email, name, profileImage})
    // console.log(`userInfo : ${JSON.stringify(userInfo, null, 2)}`)
    // console.log('FLAG', torus)
  }

  const ctx = { user, loading, login }
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}