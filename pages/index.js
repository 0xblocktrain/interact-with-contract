import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract'
import Head from 'next/head'

export default function Home() {

  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    if(window) {
      const { ethereum } = window
      if(ethereum) {
        try {
          const accounts = await ethereum.request({ method: "eth_requestAccounts" })
          console.log(accounts)
          setAddress(accounts[0])
          let provider = new ethers.providers.Web3Provider(ethereum)
          let signer = provider.getSigner()
          let c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
          setContract(c)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }

  console.log("ADDRESS ", address)
  console.log("CONTRACT ", contract)
  
  const mintNft = async() => {
    try {
      setLoading(true)
      const mint = await contract.safeMint()
      await mint.wait()
      console.log("MINTED ", mint)
      setLoading(false)
    } catch(err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Interact with smart contract</title>
        <meta name="description" content="Interact with smart contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <h1 className='text-4xl font-extrabold'>Interact with contract</h1>
        {
          loading ? (
            <h1 className='text-2xl font-extrabold'>Loading...</h1>
          ) : (
            address ? (
              <button onClick={mintNft} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Mint NFT</button>
              ) : (
              <button onClick={connectWallet} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Connect Wallet</button>
            )
          )
        }
      </main>
    </div>
  )
}