import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


export default function FilterBar({didUpdateFilter}) {
    const schools = ["University of Waterloo", "University of Western", "University of Guelph", "University of Queens", "University of Toronto"]; schools.sort();
    const categories = ["Arts", "Engineering", "Science", "Mathematics", "Environment", "Health"]; categories.sort();

    return (
        <div className="flex flex-col drop-shadow-lg fixed bg-white mt-20  h-full z-10" 
        style={{filter: "drop-shadow(2px 0px 4px rgb(0, 0, 0, 0.5))"}}>
            <div className="m-3 flex flex-col">
                <FilterItem  onUpdate={didUpdateFilter} value={'School'} filters={schools} />
                <FilterItem onUpdate={didUpdateFilter} value={'Category'} filters={categories} />
            </div>
        </div>
    )

}

function FilterItem({value, filters, onUpdate}) {

    const [isExpanded, setIsExpanded] = useState(false)

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div>
            <div className="height-10 flex items-baseline cursor-pointer" onClick={handleExpand}>
                <div className={"font-header text-lg mx-4 mt-4 "}>{value}</div>
                <FontAwesomeIcon className="ml-auto mr-2" icon={isExpanded ? faChevronDown : faChevronRight}/>
            </div>
            <div hidden={!isExpanded}>
                {
                    filters.map((item, index) => {
                        return (
                            <div className={"mx-2"} key={index}>
                                <Checkbox onChange={() => onUpdate(item)}/>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
        </div>
        ) 
}