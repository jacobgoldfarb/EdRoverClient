import Link from 'next/link'
import NavSearchBar from './search/nav-search-bar'
import AccountDropdown from './account-dropdown'

export default function Navbar({selected, onSearch, authenticated}) {

    return (
        <div className="max-w-full flex justify-between container fixed shadow-bottom bg-white h-20 z-20">
            <div className="ml-10">
                <Logo/>
            </div>
            <NavSearchBar onSearch={onSearch} shouldHide={false}/>
            <div className="flex items-center">
                { !authenticated && <NavItem selected={selected==3} value={'Login'} path={'/login'}/>}
                { authenticated && <AccountDropdown className={"mx-8 cursor-pointer"}/>}
            </div>
        </div>
    )

}

function NavItem({value, path, selected}) {
    var styles = "font-header text-lg mx-8 cursor-pointer"

    return <Link href={path}>
        <div className={styles}>{value}</div>
        </Link>
}

function Logo() {
    return <Link href={'/'}>
        <div className="p-5 text-3xl font-body font-semibold cursor-pointer"> {'EdRover'}</div>
    </Link>
}