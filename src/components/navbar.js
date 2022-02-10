import Link from 'next/link'

export default function Navbar({selected}) {

    return (
        <div className="max-w-full flex justify-between container fixed shadow-bottom bg-white h-20 z-20">
            <div className="ml-10">
                <Logo/>
            </div>
            <div className="flex items-center">
                <NavItem selected={selected==0} value={'Home'} path={'/'}/>
                {/* <NavItem selected={selected==1} value={'Explore'} path={'/explore'}/>
                <NavItem selected={selected==2} value={'Match'} path={'/match'}/> */}
                <NavItem selected={selected==3} value={'Search'} path={'/search'}/>
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