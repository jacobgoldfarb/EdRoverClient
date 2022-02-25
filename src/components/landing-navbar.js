import Link from 'next/link'
import LandingAccountDropdown from './landing-account-dropdown'

export default function LandingNavbar({selected, authenticated}) {

    return (
        <div className="max-w-full flex justify-between container fixed h-20 z-20">
            <div className="ml-10">
                <Logo/>
            </div>
            <div className="flex items-center mr-6">
                { !authenticated && <NavItem selected={selected==3} value={'Login'} path={'/login'}/>}
                { authenticated && <LandingAccountDropdown className={"mx-8 cursor-pointer"}/>}
            </div>
        </div>
    )

}

function NavItem({value, path, selected}) {
    return <Link href={path}>
        <div className={"font-header text-lg text-blue-700 text-center mx-8 cursor-pointer  w-24 py-2 rounded-xl mx-auto bg-white"}>{value}</div>
        </Link>
}

function Logo() {
    return <Link href={'/'}>
        <div className="p-5 text-3xl text-white  font-semibold font-body cursor-pointer"> {'EdRover'}</div>
    </Link>
}