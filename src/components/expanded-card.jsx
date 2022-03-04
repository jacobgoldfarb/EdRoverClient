import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import CreateReviewModal from './reviews/create_modal';

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router';

import { getReview } from '../../api/reviews';

export default function ExpandedCard({open, program, onClose}) {

  const [addedBookmark, setAddedBookmark] = useState(false)
  const [programData, setProgramData] = useState(null)
  const [schoolCoords, setSchoolCoords] = useState(null)
  const [universityData, setUniversityData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [reviews, setReviews] = useState([])

  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']
  const router = useRouter()

  useEffect( async () => { 
    if (!program) { return }
    setProgramData(program.data.program_data)
    setUniversityData(program.data.uni_data)
    const coords = program.data.uni_data.google_maps_url.split("/").pop().split(",")
    const fetchedReviews = await getReview(program.program_key)
    setReviews(fetchedReviews)
    setSchoolCoords({
      lat: Number(coords[0]),
      lng: Number(coords[1]),
    })
  }, [program])

  const addBookmark = () => {
    setAddedBookmark(!addedBookmark)
  }
  
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
        <div 
          className="cursor-pointer rounded-xl bg-violet-700 px-10 py-3 my-2 text-white text-sm"
          onClick={() => router.push(programData?.program_website)}
          >
          Visit Website
        </div>
      </div>
  </div>)

  const desc = () => (
  <div className="p-6 mb-8">
      <div className="flex">
        <div className="flex flex-col">
          <h1 className="mb-5 text-xl">
            <span className="font-semibold">{program?.program_name}</span>
            {' - '}  
            <span className="italic">{universityData?.name}</span>
          </h1>
          <p>{programData?.notes ?? programData?.description}</p>
        </div>
      </div>
    </div>)

  const breakdown = () => {
    const points = [`Located at ${programData.campus}`, `OUAC Program Code: ${programData.ouac_program_code}`, `${programData.grade_range} minimum`, `${programData.instruction_language} instruction language`]
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

  const reviewComponent = ({review, ratings}, index) => {
    const borderColor = colors[index % colors.length]
    return (
    <div className={`shadow-xl mt-8 w-5/6 mx-auto rounded-xl bg-white border-t-16 border-${borderColor} p-4`}>
        <div className="flex items-center">
          <div className="ml-4">{review}</div>
          <div className="ml-auto">
            {ratings.map(({value, label}, index) => ratingDotBar(label, value/5.0, index))}
          </div>
        </div>
      </div>
    )
  }

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

  const addReviewButton = () => (
    <div onClick={() => setShowModal(true)}
          className={`cursor-pointer mt-8 w-5/6 mx-auto rounded-xl bg-white border-2 border-dashed border-black p-4`}>
      <div className="flex items-center">
        <div className="mx-auto">Add Review</div>
      </div>
    </div>
  )

  return (
      <>
        {open && <div className={"flex-col rounded-lg py-8 mt-16 w-full mx-auto lg:w-2/3 mb-8 bg-white shadow text-left"}>
          <FontAwesomeIcon onClick={onClose} className="cursor-pointer ml-8" size="2x" icon={faTimes} />
          <CreateReviewModal open={showModal} onClose={() => setShowModal(false)} programName={program?.program_name} schoolName={universityData?.name} programId={program?.program_key}/>
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
                {reviews?.map((review, idx) => (
                  reviewComponent(review, idx)
                ))}
                  {addReviewButton()}
              </div>
            </section>
            <section>
              <div className='h-1 w-full bg-violet-700 mb-8'/>
              <MapPreview coords={schoolCoords} location={universityData.location}/>
            </section> 
            <section>
              <div className='h-1 w-full bg-violet-700 mb-8'/>
              <div className="text-xl font-medium mt-10 ml-8 mb-8">
                Entry Requirements
              </div>
              {programData.grade_range && <div className="ml-10 mb-4"> Minimum grade: {programData.grade_range}</div>}
              {
                
                programData['requirements: lis']?.map((requirement) => {
                  return (<div className="ml-10">
                    • {requirement}
                  </div>)
                })
              }
            </section>
        </div>}
      </>
  )
}

function MapPreview({coords, location}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBQGTNOnMfl1Gk-4D8VWaB2-H5yuFFMM44",
  })

  return isLoaded ? (
    <div>
      <div className="ml-20 font-bold">Oshawa Campus</div>
        <div className="ml-20 mb-6" dangerouslySetInnerHTML={{ __html: location.replace(/\n/g, "<br />") }}></div>
        <GoogleMap
          mapContainerStyle={{
            width: '60%',
            height: '400px',
            margin: '15px auto'
          }}
          defaultCenter={coords}
          center={coords}
          location={coords}
          zoom={15}
        ></GoogleMap>
      </div>
    ) : <></>
}