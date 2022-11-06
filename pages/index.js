import Head from 'next/head'
import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function Home() {

  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  console.log("ADDRESS ", address)

  return (
    <div>
      <Head>
        <title>Interact with smart contract</title>
        <meta name="description" content="Interact with smart contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <h1 className='text-4xl font-extrabold'>Interact with contract</h1>
        {/* {
          loading ? (
            <h1 className='text-2xl font-extrabold'>Loading...</h1>
          ) : (
            address ? (
              <button onClick={mintNft} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Mint NFT</button>
              ) : (
              <button onClick={connectWallet} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Connect Wallet</button>
            )
          )
        } */}
        <button onClick={() => connect()} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Connect Wallet</button>
      </main>
    </div>
  )
}
