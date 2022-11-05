import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Interact with smart contract</title>
        <meta name="description" content="Interact with smart contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-screen">
        <h1 className='text-4xl font-extrabold'>Hello world</h1>
      </main>
    </div>
  )
}
