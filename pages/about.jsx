import Head from 'next/head'
import LandingNavbar from '../src/components/landing-navbar'
import { useState, useEffect } from 'react'

import { getAuthenticatedUser, getUserData } from '../api/auth'


export default function About() {

    const [user, setUser] = useState(null)
    
    useEffect( () => {
      const getUser = async () => {
        await getAuthenticatedUser(async (authUser) => {
          if (!authUser) { return }
          const userData = await getUserData(authUser.uid)
          setUser(userData)
        })
      }
      getUser()
    }, [setUser])
    
    return (
        <div className="min-h-screen min-w-screen overflow-hidden ">
            <Head>
                <title>EdRover</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LandingNavbar selected={0} authenticated={!!user} />

            <div className="min-h-screen bg-gradient-to-b from-blue-700 to-purple-800 text-center py-20">
                <header className="font-header text-white text-3xl mx-5 my-4">
                    About EdRover
                </header>
                <div className="w-3/4 bg-white rounded-xl mx-auto text-left p-10 mb-3">
                    <div className="font-bold mt-3">Privacy Policy</div>
                    <div>At EdRover, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines information we collect and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at info@edrover.com.</div>

                    <div className="font-bold mt-3">Log Files</div>
                    <div>EdRover follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. If you choose to upload a transcript, we do not store any information related to marks or GPA. If you should choose to upload a schedule, we will store its associated information.</div>

                    <div className="font-bold mt-3">Cookies and Web Beacons</div>
                    <div>Like any other website, EdRover uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The data are used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</div>

                    <div className="font-bold mt-3">Third Party Services</div>
                    <div>At EdRover, we use a host of open source technologies and external libraries that process, but do not store your data. We also use third party authentication plugins and software from Google and Facebook.</div>

                    <div className="font-bold mt-3">Third Party Privacy Policies</div>
                    <div>EdRover's Privacy Policy does not apply other software. Thus, we are advising you to consult the respective Privacy Policies of these third parties for more detailed information. This may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: facebook.com/about/privacy, policies.google.com/privacy. You can choose to disable cookies through your individual browser options. More detailed information regarding cookie management with specific web browsers can be found at the browser’s websites.</div>

                    <div className="font-bold mt-3">Information Regarding Children</div>
                    <div>EdRover does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</div>

                    <div className="font-bold mt-3">Data Deletion</div>
                    <div>To request data deletion for your EdRover account, please email us at info@edrover.com</div>

                    <div className="font-bold mt-3">Online Privacy Policy Only</div>
                    <div>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EdRover. This policy is not applicable to any information collected offline or via channels other than this website.</div>

                    <div className="font-bold mt-3">Consent</div>
                    <div>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</div>

                    <div className="font-bold mt-3">Terms and Conditions</div>
                    <div>Please read these terms and conditions ("terms and conditions", "terms") carefully before using edrover. Com operated by EdRover.</div>

                    <div className="font-bold mt-3">Conditions of use</div>
                    <div>By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly. EdRover only grants use and access of this website, its products, and its services to those who have accepted its terms.</div>

                    <div className="font-bold mt-3">Privacy policy</div>
                    <div>Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</div>

                    <div className="font-bold mt-3">Age restriction</div>
                    <div>You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. EdRover assumes no responsibility for liabilities related to age misrepresentation.</div>

                    <div className="font-bold mt-3">Intellectual property</div>
                    You grant EdRover a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.

                    <div className="font-bold mt-3">User accounts</div>
                    <div>As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
                    If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
                    We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.</div>

                    <div className="font-bold mt-3">Applicable law</div>
                    <div>By visiting this website, you agree that the laws of the [location], without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between EdRover and you, or its business partners and associates.</div>

                    <div className="font-bold mt-3">Disputes</div>
                    <div>Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by an Ontario or federal court and you consent to exclusive jurisdiction and venue of such courts.</div>

                    <div className="font-bold mt-3">Indemnification</div>
                    <div>You agree to indemnify EdRover and its affiliates and hold EdRover harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.</div>

                    <div className="font-bold mt-3">Limitation on liability</div>
                    <div>EdRover is not liable for any damages that may occur to you as a result of your misuse of our website.EdRover reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between EdRover and the user, and this supersedes and replaces all prior agreements regarding the use of this website.</div>

                    <div className="font-bold mt-3">Attributions</div>
                    <a href="https://www.freepik.com/vectors/learning-development">Learning and development vector created by vectorjuice - www.freepik.com</a>
                </div>
            </div>
        </div>
    )
}
