import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function NavSearchBar({ defaultQuery, onSearch, shouldHide}) {

    const [query, setQuery] = useState('')

    const updateQuery = (e) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key != "Enter") { return }
        onSearch(query)
    }

    return (
        <div hidden={shouldHide} className='justify-self-center self-center z-30' style={{width: "30rem"}}>
            <input 
            className="pl-7 h-10 text-left w-full rounded-2xl bg-gray-200" 
            type="text" 
            placeholder={"Search"}
            onChange={updateQuery} 
            onKeyDown={handleKeyDown}
            defaultValue={defaultQuery}
            />
            
            <FontAwesomeIcon 
            className="cursor-pointer -ml-7 text-gray-600 w-10 h-10 " 
            icon={faSearch} 
            onClick={() => onSearch(query)}
            />
        </div>
    )
}