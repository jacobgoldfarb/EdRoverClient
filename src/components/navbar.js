import Link from 'next/link'
import NavSearchBar from './search/nav-search-bar'

export default function Navbar({selected, onSearch}) {

    return (
        <div className="max-w-full flex justify-between container fixed shadow-bottom bg-white h-20 z-20">
            <div className="ml-10">
                <Logo/>
            </div>
            <NavSearchBar onSearch={onSearch} shouldHide={false}/>
            <div className="flex items-center">
                <NavItem selected={selected==3} value={'Login'} path={'/search'}/>
            </div>
        </div>
    )

}

function NavItem({value, path, selected}) {
    var styles = "font-header text-lg mx-8 cursor-pointer"
    if (selected) {
        styles += " border-b-2 border-blue"
    }
    return <Link href={path}>
        <div className={styles}>{value}</div>
        </Link>
}

function Logo() {
    return <Link href={'/'}>
        <div className="p-5 text-3xl font-sans font-bold cursor-pointer"> {'EdRover'}</div>
    </Link>
}