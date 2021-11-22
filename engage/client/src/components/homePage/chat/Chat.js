import React from "react";
import chatImage from './chat.png'
import { Link } from "react-router-dom";
import Lottie from 'react-lottie'
import animationData from './chat.json';


const Chat = props => {
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    
      };
    return (
        <Link to="/chat">
        <div className="chat">
            {/* <img
                src={chatImage}
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

export default Chat;


