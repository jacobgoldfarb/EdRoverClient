import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { logOut } from '../../api/auth'

export default function LandingAccountDropdown({className}) {

    const [isExpanded, setIsExpanded] = useState(false)
    const router = useRouter()

    const handleExpand = () => setIsExpanded(!isExpanded)

    const handleLogOut = () => {
        router.push('/')
        logOut()
    }

    return (
        <>
            <div className={"mt-6 rounded-xl bg-white flex flex-col" + " " + className + (isExpanded ? " mt-32 shadow-xl " : "")}>
                <div className="p-5 flex items-baseline cursor-pointer" onClick={handleExpand}>
                    <div>{"Account"}</div>
                    <FontAwesomeIcon className="ml-2 mr-2" icon={faChevronDown}/>
                </div>
                {isExpanded && <div className="flex flex-col text-center">
                    <hr/>
                    <div className="mt-2"> {"Profile"} </div>
                    <hr/>
                    <div className="mt-2"> {"Bookmarks"} </div>
                    <hr/>
                    <div className="my-2" onClick={handleLogOut}> {"Log Out"} </div>
                </div>}
            </div>
        </>
    )
}