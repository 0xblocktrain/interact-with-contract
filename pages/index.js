import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { abi } from '../utils/abi'
import Head from 'next/head'

export default function Home() {
  const CONTRACT_ADDRESS = "0x316f938782c23Eb5A4a6AFE7F09b440478cdb026"
  const [address, setAddress] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)

  const connectWallet = async () => {
    if(window) {
      const { ethereum } = window
      if(ethereum) {
        try {
          const accounts = await ethereum.request({ method: "eth_requestAccounts" })
          console.log(accounts)
          setAddress(accounts[0])
          let w3 = new Web3(ethereum)
          setWeb3(w3)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }

  console.log("Address ", address)
  console.log("WEB3 ", web3)
  console.log("CONTRACT ", contract)

  useEffect(() => {
    if(web3) {
      let w3 = new Web3(ethereum)
      let c = new w3.eth.Contract(abi, CONTRACT_ADDRESS)
      setContract(c)
    }
  }, [web3])

  const mintNft = async() => {
    // get Name
    const mint = await contract.methods.name().call()
    console.log(mint)
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
          address ? (
            <button onClick={mintNft} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Mint NFT</button>
            ) : (
            <button onClick={connectWallet} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Connect Wallet</button>
          )
        }
      </main>
    </div>
  )
}
