import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './auth'
import { AssociateContext } from './associate'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useContract } from './hooks'
import toast, { Toaster } from 'react-hot-toast'
import '../components/app.css'

const IndexBody = () => {
    const [val, setVal] = useState()
    const [txLoading, setTxLoading] = useState(false)
    const { user, loading } = useContext(UserContext)
    const { associateColor } = useContext(AssociateContext)
    const contract = useContract()

    const getValue = async () => {
        if (!contract) return
        const tx = await contract.get()
        const value = parseInt(Number(tx._hex), 10)
        setVal(value)
    }

    const setValue = async (value) => {
        if (!contract) return
        setTxLoading(true)
        try {
            let loadingToast = loadingToast = toast.loading(
                <span className="toast">Confirming Transaction!</span>
            )
            const tx = await contract.set(value)
            const { hash } = tx
            toast.remove(loadingToast)
            loadingToast = toast.loading(
                <span className="toast">Transaction Confirmed!
            <a target="_blank" rel="noopener noreferrer" href={`https://${process.env.GATSBY_NETWORK}.etherscan.io/tx/${hash}`}>View in Etherscan</a>
                </span>
            )
            const receipt = await tx.wait()
            toast.remove(loadingToast)
            toast.success(<span className="toast">Transaction Successful!
            <a target="_blank" rel="noopener noreferrer" href={`https://${process.env.GATSBY_NETWORK}.etherscan.io/tx/${hash}`}>View Details</a>
            </span>, {
                duration: 6000
            })
            getValue()
        } catch (error) {
            toast.error(<div className="toast">Transaction Failed!</div>)
        } finally {
            setTxLoading(false)
        }
    }

    const handleChange = event => {
        event.preventDefault()
        setValue(event.target.number.value)
    }

    useEffect(() => {
        getValue()
    }, [contract])

    return (
        <div className="IndexBody">
            <h1>Torus DirectAuth Implementation</h1>
            {loading && <CircularProgress color={'primary'} />}
            {user ?
                <div>
                    <div>
                        <div className="user-info">
                            <h3>Name: {user.name}</h3>
                            <img src={user.profileImage} alt="Profile photo" />
                        </div>
                        <p>Ethereum Address: {user.publicAddress}</p>
                    </div>
                    {contract &&
                        <div className="chain-values">
                            <div>

                                <form id="val-form" onSubmit={handleChange}>
                                    {!txLoading ?
                                        <button className="button" form="val-form" style={{ backgroundColor: associateColor }}>Set Value</button> :
                                        <button className="button" style={{ backgroundColor: associateColor }}>Loading...</button>}
                                    <input type="text" name="number" placeholder="Enter a value..." />
                                </form>
                            </div>
                            <p>Value = {val}</p>
                        </div>
                    }</div> : !loading && <h2>Please Log In To Use</h2>}
            <Toaster
                position="top-right"
                toastOptions={{
                    loading: {
                        iconTheme: {
                            primary: '#06AA2F',
                        }
                    }
                }}
            />
        </div>
    )
}

export default IndexBody
