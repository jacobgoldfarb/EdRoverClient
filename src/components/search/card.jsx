import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Card({programName, schoolName, bulletPoints, descPreview, thumbnailUrl, handleLearnMore, id, index, topColor}) {

    function getImage() {
        return <div className="w-full h-20" style={{
            height: '5rem',
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }} />
    }

  return (
      <div 
        className={"p-3 min-w-1/4 w-1/4 max-w-1/4 bg-white rounded-xl text-sm flex flex-col cursor-pointer"} 
        onClick={() => handleLearnMore(index)}
        style={{
            minHeight: "22rem",
            maxHeight: "22rem",
            minWidth: "20rem"
        }}
        >
        {getImage()}
        <hr className="mb-2"/>
        <div>
            <div className="font-medium px-3">
                {programName} 
            </div>
            <div className='italic mt-1 px-3'>
                {schoolName}
            </div>
            <div className="px-3 text-left ml-2 my-2">
                {
                    bulletPoints?.map((point, index) => {
                        return (
                            <div key={index}>
                                {`• ${point}`}
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-3 text-left text-sm">
                {descPreview}
            </div>
        </div>  
        <div className="mt-auto mb-3 mr-3 w-full cursor-pointer flex items-center" onClick={() => handleLearnMore(id)}>
            <div className="ml-auto mr-3">
                {'Learn More '} 
                <FontAwesomeIcon className="text-gray-600 w-10 h-10 " icon={faChevronRight} />
            </div>
        </div>
          
      </div>
  )
}