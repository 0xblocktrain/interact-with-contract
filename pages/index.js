import Head from 'next/head'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract'
import { useAccount, useConnect, useContract, useSigner, chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { goerli } from 'wagmi/chains'
import { useEffect, useState } from 'react'

export default function Home() {
  const [hydrated, setHydrated] = useState(false);

  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [chain.goerli]
    }),
  })
  const { data: signer } = useSigner({
    chainId: goerli.id
  })
  console.log("SIGNER ", signer)
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer
  })

  useEffect(() => {
    setHydrated(true);
  }, []);

  console.log("ADDRESS ", address)
  console.log("CONTRACT ", contract)

  const mintNft = async() => {
    try {
      const mint = await contract.safeMint()
      await mint.wait()
      console.log(mint)
    } catch(err) {
      console.log(err)
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
          hydrated ? (
            address ? (
              <button onClick={mintNft} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>Mint NFT</button>
              ) : (
              <button onClick={() => connect()} className='py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105'>{address ? 'Mint' : 'Connect Wallet'}</button>
            )
          ) : (
            null
          )
        }
      </main>
    </div>
  )
}
