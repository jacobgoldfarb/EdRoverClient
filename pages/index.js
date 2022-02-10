import Head from 'next/head'
import Navbar from '../src/components/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar selected={0}/>
    
      <div className="min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20">
        <header className="font-header text-white text-3xl mx-5 mt-14">
          Discover the perfect higher education plan for you.
        </header>
        <Image className="bottom-0 fixed" src="/home_image.png" width="1052" height="646"/>
      </div>

      <footer>
      </footer>
    </div>
  )
}
