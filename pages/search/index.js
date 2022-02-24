import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import ExpandedCard from '../../src/components/expandedCard'
import Card from '../../src/components/search/card'
import FilterBar from '../../src/components/search/filter-bar'

import { searchPrograms } from '../../api/search'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import temp_card_data from "../../src/utils/temp_card_data.json"
import { text } from '@fortawesome/fontawesome-svg-core'

export default function Search() {

  const [ cardDetails, setCardDetails ] = useState([])
  const [ activeProgram, setActiveProgram ] = useState(null);
  const [ programCardOpen, setProgramCardOpen ] = useState(false);
  
  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']

  const router = useRouter()

  useEffect(() => {
    handleNewSearch(router.query.query)
  }, [])

  const handleNewSearch = async (query) => {
    const programs = await searchPrograms(query)
    if (programs instanceof Error ) {
      return
    }
    router.push({
      pathname: '/search',
      query: { query: query },
    })
    setCardDetails(programs.program_cards);
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

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar onSearch={handleNewSearch} selected={3}/>
      <FilterBar/>
      
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20">
        <div>
          <ExpandedCard open={programCardOpen} program={activeProgram} onClose={closeExpandedCard}/>
        </div>
        {!programCardOpen && 
        <div className="w-full mx-auto mt-28 mb-10 items-center flex flex-wrap justify-center gap-14">
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
      </div>
    
    <footer>
    </footer>
    </div>
    )
  }
  