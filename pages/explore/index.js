import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import { getSchools } from '../../src/utils/schools'
import { useEffect, useState } from 'react'

export default function Explore() {
  const [schools, setSchools] = useState([])

  useEffect(async () => {
    const schools = await getSchools()
    console.log(schools)
    setSchools(schools)
  }, [setSchools])

  return (
    <div>
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar selected={1} />
    </div>
  )
}