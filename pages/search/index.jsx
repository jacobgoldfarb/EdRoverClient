import { CardContainer } from './../../src/components/search/card-container';
import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import ExpandedCard from '../../src/components/expanded-card'
import FilterBar from '../../src/components/search/filter-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircularProgress from '@mui/material/CircularProgress';

import { searchPrograms } from '../../api/search'
import { getProgram } from '../../api/programs'
import { getAuthenticatedUser, getUserData } from '../../api/auth'
import { getProgramsFromBookmarkIds } from '../../api/bookmarks';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'


import { faSadTear } from '@fortawesome/free-solid-svg-icons'

export default function Search() {

  const [cardDetails, setCardDetails] = useState([])
  const [activeProgram, setActiveProgram] = useState(null);
  const [programCardOpen, setProgramCardOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentQuery, setCurrentQuery] = useState(0);
  const [filters, setFilters] = useState({});
  const [loadedAll, setLoadedAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const [ querySpellingError, setQuerySpellingError ] = useState(false)
  const [ misspelledQuery, setMisspelledQuery ] = useState("")
  
  const limit = 30
  const BOOKMARKS_QUERY = '$bookmarks'

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    setCurrentQuery(router.query?.query ?? "")
    const getData = async () => {
      await getAuthenticatedUser(async (authUser) => {
        if (!authUser) { 
          await fetchPrograms(router.query.query)
          setLoading(false)
          return 
        }
        const userData = await getUserData(authUser.uid)
        setUserData(userData)
        setIsAuthenticated(true)
        await fetchPrograms(router.query.query, true, userData)
        setLoading(false)
      })
    }
    getData()
  }, [router])

  const fetchPrograms = async (query, autoCorrect=true, user=userData) => {

    setQuerySpellingError(false)
    setCurrentQuery(query)

    if (query == BOOKMARKS_QUERY && !!user) {
      const bookmarkedPrograms = await getProgramsFromBookmarkIds(user?.bookmarks)
      setLoadedAll(true)
      setCardDetails([...bookmarkedPrograms.program_cards]);
      return
    }
    
    const programs = await searchPrograms(query, offset, limit, filters, autoCorrect)
    if (programs instanceof Error) {
      return
    }
    if (programs.query != query) {
      setQuerySpellingError(true)
      setMisspelledQuery(query)
      setCurrentQuery(programs.query)
    }
    setCardDetails([...programs.program_cards]);
    if (Number(programs?.program_cards.length) < limit) {
      setLoadedAll(true)
    }
  }

  const handleNewSearch = async (query) => {
    setLoadedAll(false)
    setOffset(0)
    const newQuery = query == "" ? currentQuery : query
    setLoading(true)
    await fetchPrograms(newQuery)

    router.push({
      pathname: '/search',
      query: { query: newQuery },
    }, undefined, { shallow: true })
    setCurrentQuery(newQuery)
  }

  const searchMisspelledQuery = () => {
    fetchPrograms(misspelledQuery, false)
  }

  const handleLoadMore = async () => {
    setLoading(true)
    const programs = await searchPrograms(currentQuery, offset + limit, limit, filters)
    if (programs instanceof Error) {
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
    setActiveProgram({ ...fullProgramDetails, thumbnailUrl: "https://i.ibb.co/SRwz8gK/watelroo-Image.png" })
    setProgramCardOpen(true)
  }

  const closeExpandedCard = () => {
    setActiveProgram(null)
    setProgramCardOpen(false)
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
        style={{ width: "5rem", height: "5rem" }}
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
      <Navbar onSearch={handleNewSearch} defaultQuery={router.query?.query || ""} selected={3} authenticated={isAuthenticated} />

      <div className={"flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20 "}>
        <div>
          <ExpandedCard 
            open={programCardOpen} 
            program={activeProgram} 
            onClose={closeExpandedCard} 
            bookmarked={userData?.bookmarks.includes(activeProgram?.data.program_data.ouac_program_code)} 
            authed={!!userData}
            role={"reviewer"} 
          />
        </div>
        <div className="flex">
          <FilterBar hidden={programCardOpen} didUpdateFilter={handleFilterChange} handleSearch={() => handleNewSearch(currentQuery)} />
          <div className="w-full">
          {querySpellingError && <div className="text-white mt-5">
            <div>{`Showing results for`} <span className="italic font-bold">{currentQuery}</span></div>
            <div>{`Search instead for`} <span onClick={searchMisspelledQuery} className="font-bold text-blue-100 underline cursor-pointer">{misspelledQuery}</span></div>
          </div>}
            <CardContainer hidden={programCardOpen} cardDetails={cardDetails} handleCardClick={handleCardClick}  />
            {getEmptySetIndicator()}
            {getLoadMore()}
            {loading && <CircularProgress className="mx-auto" />}
          </div>
        </div>
      </div>
      <footer>
      </footer>
    </div>
  )
}
