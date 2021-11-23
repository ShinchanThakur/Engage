import React,{useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../App'

const Logout = () => {

    // let {state, dispatch} = useContext(UserContext)
    const dispatch = useContext(UserContext).dispatch

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: "USER", payload: false})
            localStorage.setItem('userVerified', JSON.stringify(false))
            navigate('/login', { replace: true })
            if(res.status !== 200) {
                const error = new Error(res.error)
                throw error
            }
        }).catch((err) => {
            console.log(err)
        })
    })

    return (
        <>
            Logout
        </>
    )
}

export default Logout
