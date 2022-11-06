import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract'
import Head from 'next/head'

export default function Home() {
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)

  const connectWallet = async () => {
    if(window) {
      const { ethereum } = window
      if(ethereum) {
        try {
          const accounts = await ethereum.request({ method: "eth_requestAccounts" })
          console.log(accounts)
          setAddress(accounts[0])
          let web3 = new Web3(ethereum)
          let c = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
          setContract(c)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }

  console.log("Address ", address)
  console.log("CONTRACT ", contract)
  console.log("LOADING ", loading)

  const mintNft = async() => {
    setLoading(true)
    try {
      const mint = await contract.methods.safeMint().send({ from: address })
      console.log(mint)
      const events = mint?.events
      const tokenId = events?.Transfer?.returnValues?.tokenId
      console.log(tokenId)
      setToken(tokenId)
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