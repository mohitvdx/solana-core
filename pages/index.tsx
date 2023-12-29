import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as solanaWeb3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [executable, setExecutable] = useState(false)

  const addressSubmittedHandler = (address: string) => {
    try {const key = new solanaWeb3.PublicKey(address);
    setAddress(key.toBase58())

    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'))

    connection.getAccountInfo(key).then((info) => {
      
      console.log(info)
      if (info != null) {
        setExecutable(info.executable)
      }
    })

    connection.getBalance(key).then((balance) => {
      setBalance(solanaWeb3.LAMPORTS_PER_SOL * balance / 1000000000)
  
    }
    )}
    catch (err) {
      console.log("The address is not a solana address");

      //remove the previous value from the state
      setAddress('Not a Valid address')
      setBalance(0)
      setExecutable(false)

    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Solana Balance Checker
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable: ${executable}`}</p>
      </header>
    </div>
  )
}

export default Home


// Use this address to test: ComputeBudget111111111111111111111111111111