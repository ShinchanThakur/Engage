//Using bootstrap 5 => add js file link in index.html
//When using bootstrap components, remember that in jsx, every tag should have closing 
//(in html, some tags dont have closing like <input> or <hr>)
import React, {useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo1.png'
import {UserContext} from '../../App'

const Navbar = () => {

    const {state, dispatch} = useContext(UserContext)

    const getUserLoginDetails = () => {
        let userLogin = localStorage.getItem('userVerified')
        let boolUserLogin = false
        console.log(userLogin, 'before if')
        if(userLogin && userLogin !== 'undefined') {
            boolUserLogin = JSON.parse(userLogin)
            console.log('inside if')
        }
        console.log(boolUserLogin, 'before dispatch')
        dispatch({ type: "USER", payload: boolUserLogin})
        console.log(state, 'dispatch done')
    }

    useEffect(() => {
        getUserLoginDetails()
    }, [])

    const LoginLogoutNavs = () => {
        console.log(state, 'inside navs')
        if(state){
            return (
                <>
                <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
                </>
            )
        }  else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Registration</NavLink>
                    </li>
                </>
            )
        } 
    }
    
    return (
        <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#"><img src={logo} alt="logo" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">    {/* ms => ml => margin left
                                                                            me => mr => margin right */}
                        <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <LoginLogoutNavs/>
                    </ul>
                    </div>
                </div>
            </nav> 
        </>
    )
}

export default Navbar
