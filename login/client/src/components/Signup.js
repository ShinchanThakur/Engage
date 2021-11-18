import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import signupImage from '../images/signupImage.png'
const Signup = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })

    let name,value

    const handleInputs = (e) => {
        // console.log(e)
        name = e.target.name
        value = e.target.value

        setUser({ ...user, [name]:value })
    }

    const PostData = async (e) => {
        e.preventDefault()      //This prevents default refresh/reload of page which is done by form component

        const { name, email, phone, work, password, cpassword } = user      //Object destruction

        const res = await fetch("/register", {      //We have mentioned our server's port in package.json as proxy
                                                    //If we will write it directly here like https://localhost:5000/register
                                                    //then we will have CORS error which will not let us go and fetch it from external port
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({      //The server only understands string (Therefore converting it to string)
                name, email, phone, work, password, cpassword   //In reality, it is name: name, email: email, phone: phone and so on
                                                                //But when the both key value pair have same name, then we can write only one
            })
        })
        const data = await res.json()

        if(!data || data.status === 422) {
            window.alert("Invalid Registration")
            console.log("Invalid Registration")
        } else {
            window.alert("Registration Successful")
            console.log("Registration Successful")

            navigate('/login')
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content col-lg-8 offset-lg-2 d-flex justify-content-between">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your Email"/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your Phone Number"/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="work">
                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text" name="work" id="work" autoComplete="off" value={user.work} onChange={handleInputs} placeholder="Your Profession"/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your Password"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Your Password"/>
                                </div>
                                
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData}/>
                                </div>

                            </form>
                        </div>

                        <div className="signup-image">
                            <figure>
                                <img src={signupImage} alt="registratiion pic" />
                            </figure>
                            <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
