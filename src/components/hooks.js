import { useContext } from "react"
import { UserContext } from "./auth"
import { ethers as Ethers } from 'ethers'
const SimpleStorageContract = require('../../blockchain/build/contracts/SimpleStorage.json')

export const useContract = () => {
    const { user, ethers } = useContext(UserContext)
    if (!user || !ethers) return null
    const address = SimpleStorageContract.networks['4'].address
    const instance = new Ethers.Contract(address, SimpleStorageContract.abi, ethers)
    return instance
}
