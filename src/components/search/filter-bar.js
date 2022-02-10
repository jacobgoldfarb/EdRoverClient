import Link from 'next/link'

export default function FilterBar({selected}) {

    return (
        <div className="flex shadow-bottom fixed bg-white mt-5 top-16 min-w-full h-20 z-20">
            <div className="ml-10 flex items-center">
                <FilterItem value={'School'} />
                <FilterItem value={'Category'}/>
                <FilterItem value={'Tuition Cost'} />
                <FilterItem value={'Location'}/>
            </div>
        </div>
    )

}

function FilterItem({value}) {
    var styles = "font-header text-lg mx-8 cursor-pointer"
    return (
        <div className={styles}>{value}</div>
        ) 
}