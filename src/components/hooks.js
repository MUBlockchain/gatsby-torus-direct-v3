import { useContext } from "react"
import { UserContext } from "./auth"
import { ethers as Ethers } from 'ethers'
const SimpleStorageContract = require('../../blockchain/build/contracts/SimpleStorage.json')

export const useContract = () => {
    const { user, ethers, gsnProvider} = useContext(UserContext)
    if (!user || !ethers || !gsnProvider) return null
    const address = SimpleStorageContract.networks['4'].address
    let instance = new Ethers.Contract(address, SimpleStorageContract.abi, ethers)
    instance = instance.connect(gsnProvider.getSigner(user.publicAddress))
    return instance
}

