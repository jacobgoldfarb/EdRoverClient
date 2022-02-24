import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { getProgram } from '../../api/search'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useCallback } from 'react'

export default function ExpandedCard({open, program, onClose}) {

  const [addedBookmark, setAddedBookmark] = useState(false)
  const [map, setMap] = useState(null);
  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']

  const addBookmark = () => {
    setAddedBookmark(!addedBookmark)
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBQGTNOnMfl1Gk-4D8VWaB2-H5yuFFMM44",
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  
  const mockReview = [
    {
      label: "Liked",
      percent: 0.8,
    },
    {
      label: "Useful",
      percent: 1.0,
    },
    {
      label: "Easy",
      percent: 0.4,
    },
  ]

  const header = () => (
    <div className="flex flex-col w-1/2">
      <div className="w-96 h-40" style={{
        backgroundImage: `url(${program.thumbnailUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}/>
      <div className="ml-10 flex flex-col w-44">
        <div className="cursor-pointer rounded-xl bg-violet-700 px-10 py-3 my-2 text-white text-sm">See Related</div>
        <div className="cursor-pointer rounded-xl bg-violet-700 px-10 py-3 my-2 text-white text-sm">Visit Website</div>
      </div>
  </div>)

  const desc = () => (<div className="p-6 mb-8">
    <div className="flex">
      <div className="flex flex-col">
        <h1 className="mb-5 text-xl">
          <span className="font-semibold">{program.program_name}</span>
          {' - '}  
          <span className="italic">{program.uni_name}</span>
        </h1>
        <p>{program.description}</p>
      </div>
    </div>
  </div>)

  const breakdown = () => {
    const points = ["$7,865 / term tuition", "Located in Waterloo, Ontario", "OUAC Program Code: JWA", "80%+ admission average"]
    return (<div>
      <div className="text-xl font-medium mt-10 mb-4">
        Breakdown
      </div>
      {points.map((point, index) => (
        <div key={index} className="flex mb-2 items-center">
          <div className="mr-2 w-4 h-4 bg-violet-700 rounded-full"></div>
          <div>{point}</div> 
        </div>
      ))}
    </div>)
  }

  const ratingBars = () => {
    const ratingBarInformation = [
      {
        label: "Liked",
        percent: 80,
      },
      {
        label: "Useful",
        percent: 75,
      },
      {
        label: "Easy",
        percent: 60,
      },
    ]
    return (<div className="ml-4">
      {ratingBarInformation.map(({label, percent}, index) => {
        return (
          <div key={index} className="mx-auto w-5/6 mb-4">
            <div className="mb-2">{label}</div>
            <div className="flex ">
              <div className="flex w-full items-center">
                <div className={`w-3/4 h-4 bg-blue-700 rounded-xl z-10`}></div>
                <div className={`w-1/4 mr-2 -ml-1 w-1/4 h-4 bg-gray-300 rounded-r-xl`}></div>
              </div>
              <div className="ml-8 font-medium">{percent}%</div>
            </div>
          </div>
        )
      })}
    </div>)
  }

  const review = (text, ratings, index) => {
    const borderColor = colors[index % colors.length]
    return (
    <div className={`shadow-xl mt-8 w-5/6 mx-auto rounded-xl bg-white border-t-16 border-${borderColor} p-4`}>
      <div className="flex items-center">
        <div className="w-16 h-14 rounded-full bg-gray-100"></div>
        <div className="ml-4">{text}</div>
        <div>
          {ratings.map(({label, percent}, index) => ratingDotBar(label, percent, index))}
        </div>
      </div>
    </div>
  )}

  const ratingDotBar = (label, level, key) => {
    const numDots = 5
    return (<div key={key} className="flex items-center">
    <div className="flex ml-6 mr-2">
      {[...Array(level * numDots).keys()].map(key => <div key={key} className="mr-1 w-4 h-4 bg-violet-700 rounded-full"></div>)}
      {[...Array(5 - level * numDots).keys()].map(key => <div key={key} className="mr-1 w-4 h-4 bg-gray-300 rounded-full"></div>)}
    </div>
    <div className="ml-2">
      {label}
    </div>
  </div>)
  }

  const locationCard = () =>  (
    <>
    <div className='h-1 w-full bg-violet-700'/>
      <div className="text-xl font-medium mt-10 ml-8 mb-8">
        Location
      </div>
      <div className="ml-8">
        <div className="font-bold">Oshawa Campus</div>
        <div className="w-56">2000 Simcoe Street North Oshawa, Ontario L1G 0C5</div>
        <GoogleMap
          mapContainerStyle={{
            width: '50%',
            height: '400px',
            margin: '15px auto'
          }}
          center={{lat: 43.471921, lng: -80.524585}}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
        ></GoogleMap>
      </div>
    </>
  )

  return (
      <>
        {open && <div className={"flex-col rounded-lg py-8 mt-16 w-5/6 mx-auto  min-w-2/3 mb-8 bg-white shadow text-left"}>
          <FontAwesomeIcon onClick={onClose} className="cursor-pointer ml-8" size="2x" icon={faTimes} />
            <section className="px-8">
              <div className="flex">
                {header()}
                {breakdown()}
                <FontAwesomeIcon onClick={addBookmark} className={`cursor-pointer -mt-10 text-right ml-auto ${addedBookmark && "text-amber-500"}`} size="2x" icon={faBookmark} />
              </div>
              {desc()}
            </section>
            <section className="mb-10">
              <div className='h-1 w-full bg-violet-700'/>
              <div className="text-xl font-medium mt-10 ml-8 mb-8">
                Program Reviews
              </div>
              <div>
                {ratingBars()}
                {review(
                  "This program is comprehensive and gave me the skills to get the jobs of my dreams post graduation",
                  mockReview,
                  0
                  )}
                  {review(
                  "This program is comprehensive and gave me the skills to get the jobs of my dreams post graduation",
                  mockReview,
                  1
                  )}
                  {review(
                  "This program is comprehensive and gave me the skills to get the jobs of my dreams post graduation",
                  mockReview,
                  2
                  )}
              </div>
            </section>
            <section>
              {locationCard()}
            </section> 
        </div>}
      </>
  )

}