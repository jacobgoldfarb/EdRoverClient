import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


export default function FilterBar({didUpdateFilter}) {
    const categories = ["Arts", "Engineering", "Science", "Mathematics", "Environment", "Health"]
    categories.sort()

    const schools = ["University of Toronto",
        "University of Waterloo",
        "York University",
        "Queen's University",
        "McMaster University",
        "Western University",
        "Carleton University",
        "Ryerson University",
        "University of Guelph",
        "University of Ottawa",
        "University of Windsor",
        "Brock University",
        "Wilfrid Laurier University",
        "Trent University",
        "Lakehead University",
        "Ontario Tech University",
        "Laurentian University",
        "OCAD University",
        "Nipissing University",
        "Royal Military College of Canada",
        "Algoma University",
        "Redeemer University College",
        "Collège Universitaire Dominicain",
        "Université de Hearst"
    ]
    schools.sort()
    const cities = [
        "Toronto",
        "Waterloo",
        "Kingston",
        "Hamilton",
        "London",
        "Guelph",
        "Ottawa",
        "Windsor",
        "St. Catharines",
        "Waterloo",
        "Peterborough",
        "Thunder Bay",
        "Oshawa",
        "Sudbury",
        "North Bay",
        "Kingston",
        "Sault Ste. Marie",
        "Ancaster"
    ]
    cities.sort()

    return (
        <div className="overflow-auto flex flex-col drop-shadow-lg bg-white min-w-max max-w-fit min-h-screen z-10" 
        style={{filter: "drop-shadow(2px 0px 4px rgb(0, 0, 0, 0.5))"}}>
            <div className="m-3 flex flex-col">
                <FilterItem  onUpdate={didUpdateFilter} value={'School'} filters={schools} />
                <FilterItem onUpdate={didUpdateFilter} value={'Category'} filters={categories} />
                <FilterItem onUpdate={didUpdateFilter} value={'City'} filters={cities} />
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
                                    <Checkbox onChange={() => onUpdate(item)}/>
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