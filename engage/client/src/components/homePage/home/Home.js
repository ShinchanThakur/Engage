import React from 'react'
import Chat from '../chat/Chat';
import Notes from '../notes/Notes';
import VideoCall from '../videoCall/VideoCall';
import ToolTip from "../tooltip/Tooltip"
import Calander from '../calander/Calander';
import BookClass from '../bookClass/BookClass';
import QuizLogo from '../quizLogo/QuizLogo';

const Home = (props) => {
  const { Email, handleLogout } = props;
  return (
    <>
      <section className="hero">

        <div style={{ marginLeft: '75rem', marginTop: '1rem' }}><Calander /></div>


        <div style={{ marginTop: '-10rem' }}>
          <center>
            <ToolTip content="Video Session" direction="top">
              <VideoCall /></ToolTip>

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