import { useContext } from "react"
import { UserContext } from "./auth"
import { ethers as Ethers } from 'ethers'
const SimpleStorageContract = require('../../blockchain/build/contracts/SimpleStorage.json')

/**
 *  Custom hook that connects to an instance of the simple storage contract
 */
export const useContract = () => {
    const { user, ethers, gsnProvider} = useContext(UserContext)
    if (!user || !ethers || !gsnProvider) return null
    const chainID = ethers.provider._network.chainId
    const address = SimpleStorageContract.networks[chainID].address
    let instance = new Ethers.Contract(address, SimpleStorageContract.abi, ethers)
    instance = instance.connect(gsnProvider.getSigner(user.publicAddress))
    return instance
}

