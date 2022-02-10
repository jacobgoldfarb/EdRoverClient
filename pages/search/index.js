import Head from 'next/head'
import Navbar from '../../src/components/navbar'
import ExpandedCard from '../../src/components/expandedCard'
import Card from '../../src/components/search/card'
import FilterBar from '../../src/components/search/filter-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import temp_card_data from "../../src/utils/temp_card_data.json"
export default function Search() {

  const [ searchTerms, setSearchTerms ] = useState("")
  const [ cardDetails, setCardDetails ] = useState([])
  const [ activeProgram, setActiveProgram ] = useState(null);
  const [ programCardOpen, setProgramCardOpen ] = useState(false);
  
  const handleSearch = () => {
    console.log("Handling search for text: ", searchTerms)
    // 1. Call API
    // 2. Retrieve response
    // 3. Map response array to cardDetails elements (each is a prop to Card)
    console.log(temp_card_data)
    setCardDetails(temp_card_data)
  }
  
  const handleCardClick = (index) => {
    setActiveProgram(cardDetails[index])
    setProgramCardOpen(true)
  }

  const closeExpandedCard =( ) => {
    setActiveProgram(null)
    setProgramCardOpen(false)
  }

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar selected={3}/>
      <FilterBar/>
      
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20">
        <div hidden={programCardOpen} className='self-center justify-self-center mt-44 mb-14 w-full'>
          <form >
            <label>
              <div>
                <input className="pl-7 w-1/2 h-10 rounded-2xl" type="text" placeholder='Search' onChange={(e) => setSearchTerms(e.target.value)} />
                <FontAwesomeIcon className="cursor-pointer -ml-7 text-gray-600 w-10 h-10 " icon={faSearch} onClick={handleSearch} />
              </div>
            </label>
            {/* <input type="submit" value="Submit" /> */}
          </form>
        </div>
        <div>
          <ExpandedCard open={programCardOpen} program={activeProgram} onClose={closeExpandedCard}/>
        </div>
        {!programCardOpen && <div className="w-full mx-auto mb-10 items-center flex flex-wrap justify-center gap-14">
          {
            cardDetails.map((detail, index) => {
              const {programName, schoolName, bulletPoints, descPreview, thumbnailUrl } = detail
              return (<Card 
                key={index}
                id={index}
                programName={programName}
                schoolName={schoolName}
                bulletPoints={bulletPoints}
                descPreview={descPreview}
                thumbnailUrl={thumbnailUrl} 
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
  