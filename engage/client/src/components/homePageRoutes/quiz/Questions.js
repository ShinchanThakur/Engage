import './quiz.css';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Loader from './loader.svg'
import { Card, Button } from 'react-bootstrap'
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ShowResult from './ShowResult';
const Questions = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [questions, setQuestions] = useState([]);
    const [curQuestionNo, setCurQuestionNo] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);
    const [result, setResult] = useState(false);
    const { cat, dif, no } = useParams();

    const createMarkup = (text) => {
        return { __html: text };
    };

    const fetchQuizData = async () => {

        setLoading(true);
        try {

           
            const url = `https://opentdb.com/api.php?amount=${no}&category=${cat}&difficulty=${dif}&type=multiple`;
            // console.log(url);
            const { data } = await axios.get(url);

            setQuestions(data.results);
            setAllAnswers(
                [...data.results[0].incorrect_answers, data.results[0].correct_answer,].sort(() => Math.random() - 0.5)
            );
            // console.log(allAnswers);

        } catch (error) {
            console.log('Fetch quiz error =====>>>>', error);
        }
        setLoading(false);

    }

    useEffect(() => {

        fetchQuizData();
    // eslint-disable-next-line
    }, []);

    const getAnswer = (ans) => {
        questions[curQuestionNo].userAnswer = ans;
        setSelected(ans);
    };

    const reset = () => {
        navigate('/quiz');
    }

    const showResult = () => {
        if (!questions[curQuestionNo].userAnswer ) {
            alert('please select one answer');
            return false;
        }
        setResult(true);
    }
    const nextQuestion = () => {
        if (!questions[curQuestionNo].userAnswer) {
            alert('please select one answer');
            return false;
        }
        setAllAnswers(
            [...questions[curQuestionNo + 1].incorrect_answers,
            questions[curQuestionNo + 1].correct_answer,
            ].sort(() => Math.random() - 0.5)
        );
        setCurQuestionNo(curQuestionNo + 1);
    }

    return (
        <div>
            {loading ?
                (<div className='loader'><img src={Loader} alt='Loading...' /></div>)
                :
                !result ? (
                    <div>
                        {questions.length > 0 && (
                            <>
                                <Card 
                                style={{marginLeft:'2rem' , marginTop:'5rem', marginRight:'2rem', backgroundColor:'#EEEEEE'}}
                                className='questionContent'>
                                    <div className='question'>
                                        <div className='questionText' dangerouslySetInnerHTML={createMarkup(questions[curQuestionNo].question)}>
                                        </div>
                                    </div>
                                    <Card.Body >
                                        {allAnswers.map((ans, i) => {
                                            return (
                                                <div key={i}
                                                    className={selected === ans ? 'selected answer' : 'answer'
                                                    }
                                                    onClick={(e) => { getAnswer(ans) }}
                                                >


                                                    <p dangerouslySetInnerHTML={createMarkup(ans)}>

                                                    </p>
                                                </div>
                                            )
                                        })}

                                        <div>
                                            <Button variant='success'
                                                
                                                style={{ float: 'right' }}
                                                onClick={questions.length === curQuestionNo + 1 ? showResult : nextQuestion}
                                            > {questions.length === curQuestionNo + 1 ? 'Show Result' : 'Next Question'} </Button>
                                            <Button variant='danger' style={{ float: 'left' }} onClick={reset}> Reset </Button>
                                        </div>



                                    </Card.Body>
                                </Card>
                            </>
                        )}
                    </div>
                ) : (
                    <ShowResult
                    questions={questions}
                    createMarkup={createMarkup}
                    reset={reset}
                  />
                )}

        </div>
    )
}

export default Questions;