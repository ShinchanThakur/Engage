// Not being used

import React, {useState, useEffect} from 'react'

const Home = () => {
    
    const [userName, setUserName] = useState('')
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setUserName(data.name)
            setShowWelcomeMessage(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userHomePage()
    }, [])

    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{userName}</h1>
                    <h1>{ showWelcomeMessage ? 'Happy to see you back' : 'We Are The MERN Developers' }</h1>
                </div>
            </div>
        </>
    )
}

export default Home
