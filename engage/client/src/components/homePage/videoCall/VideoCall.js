import React from 'react'
import videoImage from './video.png'
import Lottie from 'react-lottie'
import animationData from './video.json';

const VideoCall = props => {
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <div className="video">
            {/* <img
                src={videoImage}
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

    )
}

export default VideoCall
