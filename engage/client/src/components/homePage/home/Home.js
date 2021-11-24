import React, { useState,useEffect} from 'react'
import Chat from '../chat/Chat'
import Notes from '../notes/Notes'
// import VideoCall from '../videoCall/VideoCall'
import ToolTip from "../tooltip/Tooltip"
import Calander from '../calander/Calander'
import BookClass from '../bookClass/BookClass'
import QuizLogo from '../quizLogo/QuizLogo'
import LastQuizMarks from '../LastQuizMarks'

const Home = () => {
  const [quizAttempted, setQuizAttempted] = useState(false)
  useEffect(() => {
    setQuizAttempted(JSON.parse(localStorage.getItem('quizAttempted')))
  },[])
  return (
    <>
      <section className="hero">

        <div className="d-flex justify-content-between" style={{ margin: '1rem', marginTop: '1rem' }}>
          <Calander />
          <LastQuizMarks quizAttempted={quizAttempted}/>
        </div>

        <div style={{ marginTop: '-15rem' }}>
          <center>
            {/* <ToolTip content="Video Session" direction="top">
              <VideoCall /></ToolTip> */}

            <ToolTip content="Chat Community" direction="top">
              <Chat /></ToolTip>

            <ToolTip content="Task Manager" direction="top">
              <Notes /></ToolTip>

            <ToolTip content="Book Class" direction="top"> 
              <BookClass /></ToolTip>

            <ToolTip content="Test Yourself" direction="top"> 
              <QuizLogo /></ToolTip>
          </center>


        </div>
      </section>

    </>
  );
}

export default Home;