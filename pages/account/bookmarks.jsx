import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import ExpandedCard from '../../src/components/expanded-card'
import FilterBar from '../../src/components/search/filter-bar'
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { getProgram } from '../../api/programs'
import { getBookmarks } from '../../api/bookmarks'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

export default function Bookmarks() {

  const router = useRouter()

  const [bookmarks, setBookmarks] = useState([])
  const [programs, setPrograms] = useState([])

  useEffect( () => {
    getBookmarks((bookmarks) => {
        setBookmarks(bookmarks)
        bookmarks?.forEach((bookmark) => {
            
        })
    })
  }, [router])

  const handleNewSearch = () => {
    router.push({
        pathname: '/search',
        query: { query: "" },
      })
  }

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar onSearch={handleNewSearch} defaultQuery={router.query?.query || ""} selected={3} authenticated={true}/>
      
      <div className={"flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20 "}>
        <header className="font-header text-white text-3xl mx-5 mt-8">
          Bookmarks
        </header>
        
        
      </div>
    <footer>
    </footer>
    </div>
    )
  }
  