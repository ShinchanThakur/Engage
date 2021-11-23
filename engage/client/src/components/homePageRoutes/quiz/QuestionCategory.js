import './quiz.css';
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const QuestionsCategory = () => {
    const navigate = useNavigate();
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [qNo, setQno] = useState(0);

    const fetchQuestionCategories = async () => {
        const { data } = await axios.get(`https://opentdb.com/api_category.php`);
        // console.log(data);
        setCats(data.trivia_categories);
    }

    // eslint-disable-next-line
    const [state, setState] = useState({});
    useEffect(() => {
        fetchQuestionCategories();
        return () => {
            setState({}); // This worked for me
          };
    }, []);


  
    const submitHandler = () => {
      if ( parseInt(qNo) > 15 || parseInt(qNo) < 1 || cat === '' || difficulty === '')
      {
          alert('please give proper inputs') ;
        
      }
      else {
          const url = `/q/${cat}/${difficulty}/${qNo}` ;
        //   return <Link to='url'></Link>
        // console.log(history);
        //  history.push(url) ;
        navigate(url)
      }
    };

    return (
        <div>

            <Card className='card' style={{ width:'40rem', marginTop: '80px',marginLeft:'25rem', padding:'2rem'}}>
                <Card.Title style={{
                    textAlign: 'center',
                    background: '#8236CB',
                    color: 'white',
                    padding:'0.5rem'
                }}>
                    Quiz Application
                </Card.Title>

                <Card.Text>

                    {/* drop down category*/}
                    <select
                    
                    style={{width:'20rem', height:'2rem'}}
                     onChange={(e) => {
                        const selectedCat = e.target.value;
                        setCat(selectedCat);
                    }}>
                        <option default>Select Category</option>
                        
                        {cats.map((c) => {
                            return <option key={c.id} value={c.id}> {c.name} </option>
                        })}
                    </select>
                    
                    {/* drop down end */}

                    {/* difficulty */}
                    <br/>
                    <select 
                    style={{marginTop:'1rem' ,width:'20rem', height:'2rem'}}
                    onChange={(e) => {
                        const selectedDiff = e.target.value;
                        setDifficulty(selectedDiff);
                    }}>
                       <option default>Select Difficulty</option>
                        <option value="easy">Easy</option>

                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>

                    </select>
                    

                    {/* end difficulty */}
                     

                    <input
                    style={{ marginTop:'1rem' , width:'20rem', height:'2rem'}}
                        type="text"
                        placeholder="Number of Questions ( 1 - 15 )"
                        className="form-control"
                        id="formGroupExampleInput"
                        // value={userName}
                        required
                        onChange={(event) => {
                            setQno(event.target.value);
                        }}
                    />
                    

                    <Button 
                    className='button-submit' 
                    style={{ width:'35rem',fontSize: '1rem', marginTop: '20px' }}
                        variant='outline-primary' 
                        onClick={submitHandler}>
                        Start

                    </Button>




                </Card.Text>


            </Card>
















        </div>
    )
};

export default QuestionsCategory;




