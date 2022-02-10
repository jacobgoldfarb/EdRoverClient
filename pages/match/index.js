import Head from 'next/head'
import Navbar from '../../src/components/navbar'

export default function Match() {
  return (
    <div>
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar selected={2} />
    </div>
  )
}