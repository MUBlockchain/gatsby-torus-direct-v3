import { useContext } from "react"
import { UserContext } from "./auth"
import {ethers as Ethers } from 'ethers'
const SimpleStorage = require('../../blockchain/build/contracts/SimpleStorage.json')

export const useContract = () => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null
    const address = SimpleStorage.networks['4'].address
    return new Ethers.Contract(address, SimpleStorage.abi, ethers)
}
