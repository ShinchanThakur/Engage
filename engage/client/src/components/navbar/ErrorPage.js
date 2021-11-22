import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <h1>404</h1>
                </div>
                <h2>We are sorry, page not found!</h2>
                <p className="mb-5">
                    The page you are looking for might have been removed.<br/>
                    Or its name has been changed.<br/>
                    Or is temporarily removed.
                </p>
                <NavLink to="/">Back to Home page</NavLink>
            </div>
        </>
    )
}

export default ErrorPage
