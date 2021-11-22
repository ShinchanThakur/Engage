import React, {useEffect, useState} from 'react'

const Contact = () => {
    
    const [userData, setUserData] = useState({})

    const callGetDataFromBackend = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json"      //We dont need to send data, so skipping other parameters
                                                    //Because we need to render contact page even to non-registered users
                }
            })
            const data = await res.json()
            console.log(data)
            setUserData({name: data.name, email: data.email, phone: data.phone})

            if(res.status !== 200) {
                const error = new Error(res.err)
                throw error
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserData({ ...userData, [name]: value})
    }

    const saveMessageInDatabase = async(e) =>{
        e.preventDefault()

        const { name, email, phone, message } = userData

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message     //name: name, email:email, then so on
            })
        })
        const data = await res.json()

        if(!data) {
            console.log("message not sent")
        } else {
            alert("Message sent")
            setUserData({ ...userData, message: ""})
        }
    }

    useEffect(() => {
        callGetDataFromBackend()
    }, [])

    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between"> {/* This allows one grid on each side horizontally and the main content is of 10 grids only out of 12 */}
                            {/* phone number */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 1111 222 3333
                                    </div>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        engage@gmail.com
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        Pune, MH
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Contact us form */}

            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in Touch
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-itmes-between">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field" placeholder="Your name" name="name" value={ userData.name } onChange={handleInputs} required="true" />
                                        <input type="email" id="contact_form_email" className="contact_form_email input_field" placeholder="Your email" name="email" value={ userData.email } onChange={handleInputs} required="true" />
                                        <input type="number" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Your phone number" name="phone" value={ userData.phone } onChange={handleInputs} required="true" />
                                    </div>
                                    <div className="contact_form_text mt-5">
                                        <textarea className="text_field contact_form_message" placeholder="Message" name="message" value={ userData.message } onChange={handleInputs} cols="50" rows="7"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button" onClick={saveMessageInDatabase}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
