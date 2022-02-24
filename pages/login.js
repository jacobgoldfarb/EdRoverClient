import Head from 'next/head'
import LandingNavbar from '../src/components/landing-navbar'
import Image from 'next/image'
import { createAccount, createUser, getAuthenticatedUser, getUserData, signIn } from '../api/auth'
import { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useRouter } from 'next/router'


export default function Login() {

  const router = useRouter()
  const [showSignUp, setShowSignUp] = useState(true)
  const [isAlum, setIsAlum] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (confirmPassword != password) {
      setErrorMessage("Passwords do not match.")
      return
    }
    const resp = await createAccount(email, password)
    if (resp instanceof Error) {
      setErrorMessage("There was a problem creating this account.")
      return
    }
    const user = resp
    if ( user?.accessToken ) {
        createUser(email, user, name);
        router.push('/search')
    } else {
        setErrorMessage(user?.message)
    }
  }

  const handleLogIn = async (e) => {
    e.preventDefault()
    const resp = await signIn(email, password)
    if (resp instanceof Error) {
        setErrorMessage("Invalid credentials.")
    } else {
          router.push('/search')
      }
  }

  const updatedUserType = (newType) => {
      setIsAlum(newType.value == "alum")
  }

  const userTypeOptions = [
      {
          label: "prospective university student",
          value: "regular"
      },
      {
        label: "current or former university student",
        value: "alum"
    },
  ]

  const getSignupCard = () => (
    <div className='w-2/3 mx-auto mt-20 bg-white rounded-xl shadow-xl z-10'>
      <div className="flex flex-col">
        <div className="mt-8 text-lg font-medium">Sign Up</div>
        <form onSubmit={handleSignUp} className="w-full mt-5 flex flex-col items-center px-14 pt-14">
          <div className="flex flex-col w-5/6 items-center">
            <div className="flex mr-auto items-center">
                <div className="mr-10">{"User type:"}</div>
                <Dropdown options={userTypeOptions} onChange={updatedUserType} value={userTypeOptions[0]} placeholder="Select an option" />
            </div>
            <label className="my-2 text-black w-full text-center flex flex-col items-center">
              <input onChange={(e) => setName(e.target.value)} className="bg-gray-200 rounded-xl h-12 w-full mb-2 pl-3" type="name" placeholder=" Name" />
              <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 rounded-xl h-12 w-full mb-2 pl-3" type="email" placeholder={isAlum ? "University Email" : "Email"} />
              <input onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 rounded-xl h-12 w-full mb-2 pl-3" type="password" placeholder=" Password" />
              <input onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-200 rounded-xl h-12 w-full pl-3" type="password" placeholder=" Confirm Password" />
            </label>
            <input type="submit" readOnly={true} className="mt-10 cursor-pointer text-center w-32 text-white h-12 bg-violet-700 rounded-full" value="Sign Up"/>
          </div>  
        </form>
        {errorMessage && <div className="text-center mt-3 mx-3">{errorMessage}</div>}
        <div className="mx-auto my-10">Already have an account? <span className="cursor-pointer text-blue-500 font-bold" onClick={() => setShowSignUp(false)}>Log in</span></div>
      </div>
    </div>
  )

  const getLoginCard = () => (
    <div className='w-2/3 mx-auto mt-20 bg-white rounded-xl shadow-xl z-10'>
      <div className="flex flex-col">
        <div className="mt-8 text-lg font-medium">Log In</div>
        <form onSubmit={handleLogIn} className="w-full mt-5 flex flex-col items-center px-14 pt-14">
          <div className="flex flex-col w-5/6 items-center">
            <label className="my-2 text-black w-full text-center flex flex-col items-center">
              <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 rounded-xl h-12 w-full mb-2 pl-3" type="email" placeholder={isAlum ? "University Email" : "Email"} />
              <input onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 rounded-xl h-12 w-full mb-2 pl-3" type="password" placeholder=" Password" />
            </label>
            <input type="submit" readOnly={true} className="mt-10 cursor-pointer text-center w-32 text-white h-12 bg-violet-700 rounded-full" value="Log In"/>
          </div>  
        </form>
        {errorMessage && <div className="text-center mt-3 mx-3">{errorMessage}</div>}
        <div className="mx-auto my-10">Need an account? <span className="cursor-pointer text-blue-500 font-bold" onClick={() => setShowSignUp(true)}>Sign up</span></div>
      </div>
    </div>
  )


  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar selected={0}/> */}
      <LandingNavbar selected={0}/>
    
        <div className="min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20">
            <header className="font-header text-white text-3xl mx-5 mt-4">
            Create an account to bookmark programs and leave reviews.
            </header>
            {showSignUp && getSignupCard()}
            {!showSignUp && getLoginCard()}
            <div className='-mt-10'>
                <Image className="bottom-0 fixed" src="/home_image.png" width="1052" height="646"/>
            </div>
        </div>
    </div>
  )
}
