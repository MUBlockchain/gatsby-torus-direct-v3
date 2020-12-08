import React, { useEffect, useState } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
import { RelayProvider, resolveConfigurationGSN } from '@opengsn/gsn'
import { ethers as Ethers } from 'ethers'
const PaymasterContract = require('../../blockchain/build/contracts/NaivePaymaster.json')


const DEFAULT_AUTH_CONTEXT = {
  user: null,
  loading: null,
  login: null,
  logout: null,
  ethers: null
}

export let UserContext = React.createContext(DEFAULT_AUTH_CONTEXT)

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ethers, setEthers] = useState(null)
  const [gsnEthers, setGsnEthers] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('Public Address') !== null) restoreSession()
  }, [])

  const torus = new DirectWebSdk({
    baseUrl: `${process.env.GATSBY_BASE_URL}/serviceworker/`,
    enableLogging: true
  })

  const initTorus = async () => {
    await torus.init()
  }

  const createSession = info => {
    const { publicAddress, privateKey, name, profileImage } = info
    localStorage.setItem('Public Address', publicAddress)
    localStorage.setItem('Private Key', privateKey)
    localStorage.setItem('Name', name)
    localStorage.setItem('Profile Image', profileImage)
  }

  const restoreSession = () => {
    const publicAddress = localStorage.getItem('Public Address')
    const privateKey = localStorage.getItem('Private Key')
    const name = localStorage.getItem('Name')
    const profileImage = localStorage.getItem('Profile Image')
    setUser({ publicAddress, privateKey, name, profileImage })
    const provider = Ethers.getDefaultProvider('rinkeby')
    const wallet = new Ethers.Wallet(`0x${privateKey}`, provider)
    setEthers(wallet)
  }

  const logout = () => {
    localStorage.removeItem('Public Address')
    localStorage.removeItem('Private Key')
    localStorage.removeItem('Name')
    localStorage.removeItem('Profile Image')
    setUser(null)
  }

  const login = async () => {
    try {
      await initTorus()
      setLoading(true)
      const userInfo = await torus.triggerLogin({
        verifier: process.env.GATSBY_VERIFIER_NAME,
        typeOfLogin: 'google',
        clientId: process.env.GATSBY_GOOGLE_CLIENT_ID
      })
      const { publicAddress, privateKey, userInfo: info } = userInfo
      const { name, profileImage } = info
      setUser({ publicAddress, privateKey, name, profileImage })
      const { wallet, gsnWallet } = await makeProviders(privateKey) //@dev
      setEthers(wallet)
      setGsnEthers(gsnWallet)
      createSession({ publicAddress, privateKey, name, profileImage })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Create ethers wallets with valid providers for rinkeby and rinkeby gsn
   * @param {string} privateKey private key signing transactions for the provider
   * @return {object} wallet plain ethers provider
   * @return {object} gsnWallet ethers enabled to use Gas Station Network
   * @dev HOW TO ACCESS PAYMASTER ADDRESS FML
   */
  const makeProviders = async (privateKey) => {
    const provider = Ethers.getDefaultProvider('rinkeby')
    const wallet = new Ethers.Wallet(`0x${privateKey}`, provider)
    const paymasterAddress = PaymasterContract.networks[4].address
    const config = await resolveConfigurationGSN(provider, { paymasterAddress })
    const gsnProvider = new RelayProvider(provider, config)
    const gsnWallet = new Ethers.Wallet(`0x${privateKey}`, gsnProvider)
    return { wallet, gsnWallet }
  }

  const ctx = { user, loading, login, logout, ethers, gsnEthers }
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}
