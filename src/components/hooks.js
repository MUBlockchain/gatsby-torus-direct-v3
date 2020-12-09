import { useContext } from "react"
import { UserContext } from "./auth"
import {ethers as Ethers } from 'ethers'
const SimpleStorage = require('../../blockchain/build/contracts/SimpleStorage.json')

/**
 *  Custom hook that connects to an instance of the simple storage contract
 */
export const useContract = () => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    // Connect to address that was deployed to rinkeby network
    const address = SimpleStorage.networks['4'].address
    // Connect to the contract instance and return so that it is accessible throughout app
    return new Ethers.Contract(address, SimpleStorage.abi, ethers)
}
