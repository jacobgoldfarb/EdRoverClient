import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import ExpandedCard from '../../src/components/expanded-card'
import Card from '../../src/components/search/card'
import FilterBar from '../../src/components/search/filter-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircularProgress from '@mui/material/CircularProgress';

import { searchPrograms } from '../../api/search'
import { getProgram } from '../../api/programs'
import { getAuthenticatedUser, getUserData } from '../../api/auth'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

export default function Search() {

  const [ cardDetails, setCardDetails ] = useState([])
  const [ activeProgram, setActiveProgram ] = useState(null);
  const [ programCardOpen, setProgramCardOpen ] = useState(false);
  const [ offset, setOffset ] = useState(0);
  const [ currentQuery, setCurrentQuery ] = useState(0);
  const [ filters, setFilters ] = useState({});
  const [ loadedAll, setLoadedAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const limit = 30  
  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']

  const router = useRouter()

  useEffect( async () => {
    setLoading(true)
    await fetchPrograms(router.query.query)
    await getAuthenticatedUser( async (authUser) => {
      if (!authUser) { return }
      const userData = await getUserData(authUser.uid)
      setUserData(userData)
      setIsAuthenticated(true)
    })
    setLoading(false)
  }, [router])

  const fetchPrograms = async (query) => {
    setCurrentQuery(query)
    const programs = await searchPrograms(query, offset, limit, filters)
    if (programs instanceof Error ) {
      return
    }
    setCardDetails([...programs.program_cards]);
    if (Number(programs?.program_cards.length) < limit) {
      setLoadedAll(true)
    }
  }

  const handleNewSearch = async (query) => {
    setLoading(true)
    await fetchPrograms(query)

    router.push({
      pathname: '/search',
      query: { query: query },
    }, undefined, {shallow: true})
    setLoading(false)
  }

  const handleLoadMore = async () => {
    setLoading(true)
    const programs = await searchPrograms(currentQuery, offset + limit, filters)
    if (programs instanceof Error ) {
      return
    }
    if (programs?.program_cards.length < limit) {
      setLoadedAll(true)
    }
    setOffset(offset + limit)
    setCardDetails([...programs.program_cards, ...cardDetails]);
    setLoading(false)
  }
  
  const handleCardClick = async (index) => {
    const selectedProgram = cardDetails[index]
    const fullProgramDetails = await getProgram(selectedProgram.program_key)
    setActiveProgram({...fullProgramDetails, thumbnailUrl: "https://i.ibb.co/SRwz8gK/watelroo-Image.png"})
    setProgramCardOpen(true)
    const fullProgram = await getProgram(selectedProgram.program_key)
  }

  const closeExpandedCard = () => {
    setActiveProgram(null)
    setProgramCardOpen(false)
  }

  const truncateLongDesc = (text) => {
    if (!text) { return text }
    if (text.length > 300) {
      text = text.substring(0, 300) + "..."
    }
    return text
  }

  const handleFilterChange = (filterItem, filterKey) => {
    if (!filters[filterKey]) {
      filters[filterKey] = [filterItem]
      setFilters(filters)
      return
    }
    var index = filters[filterKey].indexOf(filterItem)
    if (index == -1) {
        filters[filterKey] = [...filters[filterKey], filterItem]
        setFilters(filters)
    } else {
        filters[filterKey].splice(index, 1);
        setFilters(filters)
    }
  }

  const getCards = () => (
    <div className={"w-full mx-auto mt-12 mb-10 items-center flex flex-wrap justify-center gap-14 "}>
      {
        cardDetails?.map((detail, index) => {
        const {program_key, program_name, uni_name, description, image_url } = detail
        const descriptionPreview = truncateLongDesc(description)
          return (<Card 
            key={program_key}
            id={program_key}
            index={index}
            programName={program_name}
            schoolName={uni_name}
            descPreview={descriptionPreview}
            thumbnailUrl={"https://i.ibb.co/SRwz8gK/watelroo-Image.png"}
            topColor={colors[index%colors.length]}
            handleLearnMore={handleCardClick}
          />)
        })
      }
    </div>
  )

  const showLoadMore = () => (
    cardDetails.length > 0 && !programCardOpen && !loadedAll 
  )

  const getLoadMore = () => {
    return (showLoadMore() && <div onClick={handleLoadMore} className="cursor-pointer text-white my-5">
      Load More
    </div>)
  }

  const getEmptySetIndicator = () => (
    !loading && cardDetails.length == 0 && 
    <>
      <FontAwesomeIcon 

        className="mx-auto text-white mb-4" 
        icon={faSadTear}
        style={{width: "5rem", height: "5rem"}}
      />
      <div className="text-white">{`Oops! We couldn't find any program matches for the query "${currentQuery}"`}</div>
    </>
  )

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar onSearch={handleNewSearch} defaultQuery={router.query?.query || ""} selected={3} authenticated={isAuthenticated}/>
      
      <div className={"flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20 "}>
        <div>
          <ExpandedCard open={programCardOpen} program={activeProgram} onClose={closeExpandedCard}/>
        </div>
      {!programCardOpen && <div className="flex">
        <FilterBar didUpdateFilter={handleFilterChange}/>
        <div className="w-full"> 
          {getCards()}
          {getEmptySetIndicator()}
          {getLoadMore()}
          {loading && <CircularProgress className="mx-auto"/>}
        </div>
        </div>}
        
      </div>
    <footer>
    </footer>
    </div>
    )
  }
  