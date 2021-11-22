import React from "react";
import quizLogo from './quiz.png'
import { Link } from "react-router-dom";
import Lottie from 'react-lottie'
import animationData from './quiz.json';


const QuizLogo = props => {
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    
      };

    return (

        <Link to="/quiz">
            <div className="quiz">
                {/* <img
                    src={quizLogo}
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

export default QuizLogo;

