import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({onChange, onSearch, shouldHide}) {

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(e)
  }

    return (
        <div hidden={shouldHide} className='justify-self-center self-center z-30'>
          <label>
            <div>
              <input max={120} className="shadow-md pl-7 h-12 text-left w-2/5 rounded-3xl bg-white" type="text" placeholder='Search' onChange={onChange} />
              <FontAwesomeIcon className="cursor-pointer -ml-7 text-gray-600 w-10 h-10 " icon={faSearch} onClick={handleSearch} />
            </div>
          </label>
        </div>
    )
}