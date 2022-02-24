import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function NavSearchBar({onChange, onSearch, shouldHide}) {


    return (
        <div hidden={shouldHide} className='justify-self-center self-center z-30' style={{width: "30rem"}}>
            <input className="pl-7 h-10 text-left w-full rounded-2xl bg-gray-200" type="text" placeholder='Search' onChange={onChange} />
            <FontAwesomeIcon className="cursor-pointer -ml-7 text-gray-600 w-10 h-10 " icon={faSearch} onClick={onSearch} />
        </div>
    )
}