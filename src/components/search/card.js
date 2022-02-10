import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Card({programName, schoolName, bulletPoints, descPreview, thumbnailUrl, handleLearnMore, id}) {

  return (
      <div className={"min-w-1/4 w-1/4 max-w-1/4 bg-white rounded-xl text-sm flex flex-col cursor-pointer"} onClick={() => handleLearnMore(id)}>
        <div className="bg-green-100 w-full h-12 rounded-t-xl mb-3"/>
        <div className="w-full h-20" style={{
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}/>
        <div>
            <div className="px-3">
                {programName} {" —"} <span className='italic'>{schoolName}</span>
            </div>
            <div className="px-3 text-left ml-2 my-2">
                {
                    bulletPoints.map((point, index) => {
                        return (
                            <div key={index}>
                                {`• ${point}`}
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-3 text-sm italic">
                {descPreview}
            </div>
            <div className="w-full cursor-pointer flex items-center" onClick={() => handleLearnMore(id)}>
                <div className="ml-auto mr-3 mb-3">
                    {'Learn More '} 
                    <FontAwesomeIcon className="text-gray-600 w-10 h-10 " icon={faChevronRight} />
                </div>
            </div>
        </div>  
          
      </div>
  )

}