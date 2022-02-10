import Head from 'next/head'
import Navbar from '../src/components/navbar'
import Image from 'next/image'
import { createAccount, createUser, getAuthenticatedUser, getUserData } from '../api/auth'
import { useEffect, useState } from 'react'

export default function Home() {

  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect( async () => {
    await getAuthenticatedUser(async (authUser) => {
      console.log("authUser", authUser)
      const userData = await getUserData(authUser.uid)
      setUser(userData)
    })
  }, [setUser])

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
        setErrorMessage("Success")
    } else {
        setErrorMessage(user?.message)
    }
  }

  return (
    <div className="min-h-screen min-w-screen overflow-hidden ">
      <Head>
        <title>EdRover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar selected={0}/>
    
      <div className="min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center pt-20">
        <header className="font-header text-white text-3xl mx-5 mt-14">
          Discover the perfect higher education plan for you.
        </header>
        {!user && <div className='w-1/2 mx-auto mt-20 bg-white rounded-xl shadow-xl'>
          <div className="flex flex-col">
            <div className="mt-8 text-lg font-medium">Sign Up</div>
            <form onSubmit={handleSignUp} className="w-full mt-5 flex flex-col items-center p-14">
              <div className="flex flex-col w-5/6 items-center">
                <label className="my-2 text-black w-full text-center flex flex-col items-center">
                  <input onChange={(e) => setName(e.target.value)} className="border-2 h-12 w-full mb-2 pl-3" type="name" placeholder=" Name" />
                  <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 w-full mb-2 pl-3" type="email" placeholder=" Email" />
                  <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12 w-full mb-2 pl-3" type="password" placeholder=" Password" />
                  <input onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 h-12 w-full pl-3" type="password" placeholder=" Confirm Password" />
                </label>
                <input type="submit" readOnly={true} className="mt-10 cursor-pointer text-center w-20 text-white h-12 bg-violet-700 rounded-full" value="Log In"/>
              </div>  
            </form>
            {<div className="text-center mt-3 mx-3">{errorMessage}</div>}
            </div>
        </div>
      }
      { user && <div className="font-header text-white text-3xl mx-5 mt-8">
          Welcome back, <span className="font-bold">{user.name}</span>!
        </div>}
        {/* <Image className="bottom-0 fixed" src="/home_image.png" width="1052" height="646"/> */}
      </div>
      <footer>
      </footer>
    </div>
  )
}
