import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card'

const LastQuizMarks = () => {
  const [quizAttempted, setQuizAttempted] = useState(false)
  const [lastQuizMarks, setLastQuizMarks] = useState(0)

  useEffect(() => {
    setQuizAttempted(JSON.parse(localStorage.getItem('quizAttempted')))
  },[])

  useEffect(() => {
    if(quizAttempted)
      setLastQuizMarks(JSON.parse(localStorage.getItem('lastQuizMarks'))) 
  },[quizAttempted])

  return (
    <>
      <Card style={{ width: '13rem' }}>
        <Card.Header style={{ backgroundColor: '#7DEDFF' }}><center><b>Performance</b></center></Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">

            <center><b>{quizAttempted ? lastQuizMarks : "You have not attended any quiz yet"}</b></center>

          </blockquote>
        </Card.Body>
        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
            <center><b>Last Quiz Percentage</b></center>
        </Card.Header>

      </Card>
    </>

  );
};

export default LastQuizMarks;