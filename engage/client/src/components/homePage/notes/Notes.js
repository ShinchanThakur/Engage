import React from "react";
import notesImage from './todo.jpeg'
import { Link } from "react-router-dom";
import Lottie from 'react-lottie'
import animationData from './todo.json';

const Notes = props => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    
      };

    return (

        <Link to="/taskManager">
            <div className="notes">
                {/* <img
                    src={notesImage}
                    width="110"
                    height="110"
                    className="hover-zoom"
                /> */}
                <Lottie
            options={defaultOptions}
            height={200}
            width={200}
          />
            </div>
        </Link>


    );
};

export default Notes;

