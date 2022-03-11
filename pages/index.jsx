import Head from 'next/head'
import LandingNavbar from '../src/components/landing-navbar'
import SearchBar from '../src/components/search/search-bar'
import Image from 'next/image'

import { getAuthenticatedUser, getUserData } from '../api/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const [user, setUser] = useState(null)
  const [query, setQuery] = useState("")

  const router = useRouter()

  useEffect( () => {
    const getUser = async () => {
      await getAuthenticatedUser(async (authUser) => {
        if (!authUser) { return }
        const userData = await getUserData(authUser.uid)
        setUser(userData)
      })
    }
    getUser()
  }, [setUser])

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key != "Enter") { return }
    handleSearch()
  }

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      query: { query: query },
    })
  }

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingNavbar selected={0} authenticated={!!user}/>
    
      <div className="min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20">
        <header className="font-header text-white text-3xl mx-5 mt-4">
          Find the perfect higher education plan for you.
        </header>
      { user && <div className="font-header text-white text-3xl mx-5 mt-8">
          Welcome back, <span className="font-bold">{user.name}</span>!
        </div>}
        <div onKeyDown={handleKeyDown} className="mt-8">
          <SearchBar onSearch={handleSearch} onChange={handleSearchChange} />
        </div>
        <Image className="bottom-0 fixed" src="/home_image.png" width="1052" height="646"/>
      </div>
      <footer>
      </footer>
    </div>
  )
}
