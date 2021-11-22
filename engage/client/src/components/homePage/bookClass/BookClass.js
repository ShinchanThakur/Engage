import React from "react";
import ClassLogo from './class2.png';
import { Link } from "react-router-dom";
import Lottie from 'react-lottie'
import animationData from './teacher.json';


const BookClass = props => {

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    
      };

    return (
        <>
        <Link to="/VaccinationDetail">
            <div className="book">
            <Lottie
            options={defaultOptions}
            height={200}
            width={200}
          />
                {/* <img
                    src={ClassLogo}
                    width="110"
                    height="110"
                    className="hover-zoom"
                /> */}
            </div>
        </Link>
        </>


    );
};

export default BookClass;

