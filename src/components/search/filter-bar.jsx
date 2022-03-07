import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


export default function FilterBar({didUpdateFilter, handleSearch}) {
    const categories = ["Arts", "Engineering", "Science", "Mathematics", "Environment", "Health"]
    categories.sort()

    const [needsUpdate, setNeedsUpdate] = useState(false)

    const schools = [
        "University of Ottawa",
        "University of Waterloo",
        "Nipissing University",
        "Université de l'Ontario français",
        "Brock University",
        "Lakehead University",
        "OCAD University",
        "University of Toronto",
        "Ontario Tech University",
        "Carleton University",
        "University of Guelph",
        "Wilfrid Laurier University",
        "Trent University",
        "Ryerson University",
        "McMaster University",
        "Royal Military College of Canada",
        "Queen's University",
        "University of Windsor",
        "Algoma University",
        "Laurentian University",
        "Western University",
        "York University",
    ]
    schools.sort()
    const cities = [
        "Sudbury",
        "Mississauga",
        "Ottawa",
        "Waterloo",
        "Hearst",
        "North Bay",
        "Guelph",
        "Sault Ste. Marie",
        "York",
        "Hamilton",
        "Brantford",
        "London",
        "Windsor",
        "Oshawa",
        "Toronto",
        "Thunder Bay",
        "Kingston",
        "Peterborough",
        "St. Catharines",
    ]

    const handleFilterUpdate = (item, key) => {
        didUpdateFilter(item, key)
        setNeedsUpdate(true)
    }

    
    cities.sort()

    return (
        <div className="overflow-auto flex flex-col drop-shadow-lg bg-white min-w-max max-w-fit min-h-screen z-10" 
        style={{filter: "drop-shadow(2px 0px 4px rgb(0, 0, 0, 0.5))"}}>
            <div className="m-3 flex flex-col">
                
                {needsUpdate && <div className="flex items-baseline">
                    <div className="font-semibold text-indigo-800 mt-2 cursor-pointer mx-3" onClick={() => {
                        handleSearch()
                        setNeedsUpdate(false)
                    }}>Update Results</div>
                    <FontAwesomeIcon className={ "text-indigo-800"} icon={faArrowCircleRight} />
                </div>    
                }
                <FilterItem onUpdate={handleFilterUpdate} value={'School'} filters={schools} filterKey={"schools_filter"} />
                <FilterItem onUpdate={handleFilterUpdate} value={'Category'} filters={categories} filterKey={"categories_filter"} />
                <FilterItem onUpdate={handleFilterUpdate} value={'City'} filters={cities} filterKey={"cities_filter"} />
            </div>
        </div>
    )

}

function FilterItem({value, filters, filterKey, onUpdate, needs}) {

    const [isExpanded, setIsExpanded] = useState(false)

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="mr-6">
            <div className="height-10 flex items-baseline cursor-pointer" onClick={handleExpand}>
                <div className={"font-header text-lg mx-4 mt-4 cursor-pointer"}>{value}</div>
                <FontAwesomeIcon className="ml-auto mr-2" icon={isExpanded ? faChevronDown : faChevronRight}/>
            </div>
            <div hidden={!isExpanded}>
                <div className="flex flex-col items-start">
                    {
                        filters.map((item, index) => {
                            return (
                                <div className={"mx-2 flex items-center "} key={index}>
                                    <Checkbox onChange={() => {
                                        onUpdate(item, filterKey)
                                    }}/>
                                    <div className="text-left">{item}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        ) 
}