import React, {useState, useContext, useEffect} from 'react'
import loginImage from '../../images/signupImage.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../../App"

const Login = () => {

    let {state, dispatch} = useContext(UserContext)
    // const context = useContext(contextValue)
    // here we use our context api

    const navigate = useNavigate()
    const [email, setEmail] = useState('')      //If we dont put '' inside brackets, then the browser will throw an error stating that the value of undefined has been changed to defined or something like that
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault()

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,              //email:email
                password            //password: password
            })
        })
        const data = await res.json()

        if(!data || res.status === 400) {
            window.alert("Invalid Credentials")
            console.log("Invalid Credentials")
        } else {
            //changing the state using context api
            dispatch({ type: "USER", payload: true})    //type => type of action
                                                        //payload => extra info/message we want to pass
            localStorage.setItem('userVerified', JSON.stringify(true))
            window.alert("Login Successful")
            console.log("Login Successful")
            console.log(state, 'just after login')
            navigate("/")
        }
    }

    return (
        <>
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="col-lg-8 offset-lg-2 signin-content d-flex justify-content-between">
                    
                        <div className="signin-image">
                            <figure>
                                <img src={loginImage} alt="Login pic" />
                            </figure>
                            <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Log in</h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email"/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password"/>
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" onClick={loginUser} value="Log In" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
