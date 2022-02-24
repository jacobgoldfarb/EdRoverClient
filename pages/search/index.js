import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import ExpandedCard from '../../src/components/expandedCard'
import Card from '../../src/components/search/card'
import FilterBar from '../../src/components/search/filter-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { searchPrograms } from '../../api/search'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

export default function Search() {

  const [ cardDetails, setCardDetails ] = useState([])
  const [ activeProgram, setActiveProgram ] = useState(null);
  const [ programCardOpen, setProgramCardOpen ] = useState(false);
  const [ offset, setOffset ] = useState(0);
  const [ currentQuery, setCurrentQuery ] = useState(0);
  const [ filters, setFilters ] = useState([]);
  const [ loadedAll, setLoadedAll] = useState(false)
  const limit = 30  
  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']

  const router = useRouter()

  useEffect(() => {
    console.log("Searching...", router.query)
    handleNewSearch(router.query.query)
  }, [])

  const handleNewSearch = async (query) => {
    setCurrentQuery(query)
    const programs = await searchPrograms(query, offset, filters)
    if (programs instanceof Error ) {
      return
    }
    router.push({
      pathname: '/search',
      query: { query: query },
    }, undefined, {shallow: true})
    setCardDetails([...programs.program_cards]);
  }

  const handleLoadMore = async () => {
    const programs = await searchPrograms(currentQuery, offset + limit, filters)
    if (programs instanceof Error ) {
      return
    }
    if (programs?.program_cards.length == 0) {
      setLoadedAll(true)
    }
  }
  
  const handleCardClick = (index) => {
    setActiveProgram({...cardDetails[index], thumbnailUrl: "https://i.ibb.co/SRwz8gK/watelroo-Image.png"})
    setProgramCardOpen(true)
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

  const handleFilterChange = (filterItem) => {
    var index = filters.indexOf(filterItem);    // <-- Not supported in <IE9
    if (index == -1) {
        setFilters([...filters, filterItem])
    } else {
        filters.splice(index, 1);
        setFilters(filters)
    }
  }

  const getMargin = () => {
    return programCardOpen ? "" : " ml-36 "
  }

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar onSearch={handleNewSearch} selected={3}/>
      {!programCardOpen && <FilterBar didUpdateFilter={handleFilterChange}/>}
      
      <div className={"flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20 " + getMargin()}>
        <div>
          <ExpandedCard open={programCardOpen} program={activeProgram} onClose={closeExpandedCard}/>
        </div>
        {!programCardOpen && 
        <div className="w-full mx-auto mt-12 mb-10 items-center flex flex-wrap justify-center gap-14">
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

        </div>}
        {cardDetails && !programCardOpen && !loadedAll && <div onClick={handleLoadMore} className="cursor-pointer text-white my-5">
          Load More
        </div>}
      </div>
    <footer>
    </footer>
    </div>
    )
  }
  