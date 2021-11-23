import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap'
import './quiz.css';


const ShowResult = ({ questions, createMarkup, reset }) => {
  const [score, setScore] = useState(0)
  const [fullScore, setFullScore] = useState(0)

  const setUserQuizMarks = async() => {
    const percentage = 100 * score/fullScore
    await fetch('/setUserQuizMarks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            percentage 
        })
    })
}
  useEffect(() => {
    if (questions.length > 0) {
      setScore(
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 10
      )
      setFullScore(questions.length*10)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(fullScore !== 0)
      setUserQuizMarks()
  }, [fullScore])

  return (
    <div style={{fontSize:'1.2rem' , margin:'3rem'}}>
        <Card style={{marginTop:'3rem',marginLeft:'20rem',width:'50rem'}}>
         <Card.Header 
        
         style={{textAlign: 'center',backgroundColor:'rgb(73,189,235)',
        color:'white',
    }}>
        Marksheet
         </Card.Header>
        <Card.Body style={{backgroundColor:'#D9CAB3'}}>

         <div style={{textAlign:'center',
        
        fontWeight:'bold',}}>
            Full Score: {fullScore}
        </div>
        
        <div style={{textAlign:'center',
      
    fontWeight:'bold'}}>
        Your Score : {score}
    </div>



        </Card.Body>
   
        </Card>

{
    questions.map((q,i) => {
        return (
            <Card key={i} style={{marginTop: '15px',backgroundColor:'#EEEEEE'}}>
                <div className='question'>
                    <div className='questionText'
                    dangerouslySetInnerHTML={createMarkup(q.question)}>

                    </div>
                </div>
                <hr/>
                <Card.Body style={{backgroundColor:q.userAnswer === q.correct_answer ? '#B2EA70' : '#FF9292'}}>
                    <div style={{textAlign: 'center'}} className='answerq'>
                        <b> Your Answer: </b> {' '}
                        <div dangerouslySetInnerHTML={createMarkup(q.userAnswer)}
                        className={q.userAnswer === q.correct_answer ? 'correct' : 'wrong'}>

                        </div>
                        
                        <b> Correct Answer:</b>
                        <div dangerouslySetInnerHTML={createMarkup(q.correct_answer)}
                        className='systemAnswer'>

                        </div>
                    </div>
                    <div style={{float:'right', color:'#142F43'}}>
                        <b>Mark : </b>
                        <div dangerouslySetInnerHTML={createMarkup(q.userAnswer === q.correct_answer ? '10' : '00')}
                        className={q.userAnswer === q.correct_answer ? 'correct' : 'wrong'}/>
                    </div>
                </Card.Body>
            </Card>
        )
    })
}

<div>
        <Button
          variant='danger'
          onClick={reset}
          style={{ marginLeft: '20rem', marginTop: '2rem', width: '50rem' }}
          color='primary'
        >
          Reset
        </Button>
      </div>


     </div>
  );
};

export default ShowResult;
