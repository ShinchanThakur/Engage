import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectPreference from './subjectPreference/SubjectPreference';
import Grid from "@material-ui/core/Grid";
import Alert from 'react-bootstrap/Alert'
import {useNavigate} from 'react-router-dom'

const VaccinationDetails = () => {
    const navigate = useNavigate()
// TYPE OF USER
    const[registeredUser, setRegisteredUser] = useState("") ;

    const[MathsTotalSeats, setMathsTotalSeats] = useState(0) ;
    const[PhysicsTotalSeats, setPhysicsTotalSeats] = useState(0) ;
    const[ChemistryTotalSeats, setChemistryTotalSeats] = useState(0) ;
    

    const [userName, setUserName] = useState("");
    const [RegNo, setRegNo] = useState("");

    const [disableMaths, setDisableMaths] = useState(true);
    const [Maths, setMath] = useState(false);
    const [MathsOccupiedSeats, setMathsOccupiedSeats] = useState(0);
    const [limitMaths, setlimitMaths] = useState(false);
    const [mathsStudentsArray, setMathsStudentsArray] = useState([]);

    const [disablePhysics, setDisablePhysics] = useState(true);
    const [Physics, setPhysics] = useState(false);
    const [PhysicsOccupiedSeats, setPhysicsOccupiedSeats] = useState(0);
    const [limitPhysics, setlimitPhysics] = useState(false);
    const [physicsStudentsArray, setPhysicsStudentsArray] = useState([]);

    const [disableChemistry, setDisableChemistry] = useState(true);
    const [Chemistry, setChemistry] = useState(false);
    const [ChemistryOccupiedSeats, setChemistryOccupiedSeats] = useState(0);
    const [limitChemistry, setlimitChemistry] = useState(false);
    const [chemistryStudentsArray, setChemistryStudentsArray] = useState([]);
    // const[FullChemistry,isFullChemistry] = useState(false) ;

    const [handleSubmitPreference, sethandleSubmitPreference] = useState(true);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  DATE SETTER

    let newDate, day;
    var dayNames =  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    // var monthNames = ["January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December"];
    // let month
    const setDate = () => {
        newDate = new Date();    
        day = dayNames[newDate.getDay()];
        // month = monthNames[newDate.getMonth()] ;
            return <Alert width='2rem' variant='primary'>
                Now book your class for <b> {day} (tomorrow) </b> doubt session
            </Alert> 
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//  FUNCTIONS CALLED DURING FIRST TIME RENDERING

    const [totalSeatsFetched, setTotalSeatsFetched] = useState(false)
    const [occupiedSeatsFetched, setOccupiedSeatsFetched] = useState(false)

    function setLimits() {
        if (MathsOccupiedSeats >= MathsTotalSeats) setlimitMaths(true);
        else if (MathsOccupiedSeats < MathsTotalSeats) setlimitMaths(false);
        if (PhysicsOccupiedSeats >= PhysicsTotalSeats) setlimitPhysics(true);
        else if (PhysicsOccupiedSeats < PhysicsTotalSeats) setlimitPhysics(false);
        if (ChemistryOccupiedSeats >= ChemistryTotalSeats) setlimitChemistry(true);
        else if (ChemistryOccupiedSeats < ChemistryTotalSeats) setlimitChemistry(false);
    }

    const getTotalSeats = async () => {
        try {
            const res = await fetch('/getTotalSeats', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setMathsTotalSeats ( data.maths) ;
            setPhysicsTotalSeats (data.physics) ;
            setChemistryTotalSeats(data.chemistry) ;
            setTotalSeatsFetched(true)
        } catch (err) {
            console.log(err)
        }
    }

    const getOccupiedSeats = async () => {
        try {
            const res = await fetch('/getOccupiedSeats', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setMathsOccupiedSeats(data.maths);
            setPhysicsOccupiedSeats(data.physics);
            setChemistryOccupiedSeats(data.chemistry);
            setOccupiedSeatsFetched(true)
        } catch (err) {
            console.log(err)
        }
    }

    const getStudentClassList = async () => {
        try {
            const res = await fetch('/getStudentClassList', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            var studentM = [], studentP = [], studentC = [];
                for (var i = 0; i < data.length; i++) {

                    if (data[i].subject === "maths") {
                        studentM.push(data[i].name + " - " + data[i].id)
                    }
                    else if (data[i].subject === "physics") {
                        studentP.push(data[i].name + " - " + data[i].id)
                    }
                    else if (data[i].subject === "chemistry") {
                        studentC.push(data[i].name + " - " + data[i].id)
                    }
                }
                setMathsStudentsArray(studentM)
                setPhysicsStudentsArray(studentP)
                setChemistryStudentsArray(studentC)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        setRegisteredUser("admin") ;
        getTotalSeats()
        getOccupiedSeats()
        getStudentClassList()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(totalSeatsFetched && occupiedSeatsFetched)
            setLimits()         //Calling it here so that it runs after all values are fetched from backend
    // eslint-disable-next-line
    }, [totalSeatsFetched, occupiedSeatsFetched])

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//  STUDENT

    const handleSubmit = async() => {
        if (Maths || Physics || Chemistry) {
            const info = {
                Maths: Maths,
                Physics: Physics,
                Chemistry: Chemistry,
            }

            await fetch('/addClass', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            })
            //Put some exception handling
            //Store class preferences in a separate database too
            sethandleSubmitPreference(false);
        }
        else {
            alert("no classes selected")
        }
    }



    const handleMaths = () => {
        setDisableMaths(false); // to enable red button of cancel now
        setMathsOccupiedSeats(MathsOccupiedSeats + 1);  // to increment the total count of maths students 
        setMath(true) // for that particular student set true as he clicked on book now 
    }
    const cancelMaths = () => {
        setDisableMaths(true);
        setMathsOccupiedSeats(MathsOccupiedSeats - 1);
        setMath(0)
    }

    const handlePhysics = () => {
        setDisablePhysics(false);
        setPhysicsOccupiedSeats(PhysicsOccupiedSeats + 1);
        setPhysics(true)
    }
    const cancelPhysics = () => {
        setDisablePhysics(true);
        setPhysicsOccupiedSeats(PhysicsOccupiedSeats - 1);
        setPhysics(false)

    }

    const handleChemistry = () => {
        setDisableChemistry(false);
        setChemistryOccupiedSeats(ChemistryOccupiedSeats + 1);
        setChemistry(true);
    }
    const cancelChemistry = () => {
        setDisableChemistry(true);
        setChemistryOccupiedSeats(ChemistryOccupiedSeats - 1);
        setChemistry(false);
    }

    const printStudents = (event) => {
        if (event.length === 0) {
            return <h5>EMPTY CLASS :( </h5>
        }
        return event.map((item, i) => (
            <h5 key={i}>{item}</h5>
        ))
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ADMIN RIGHTS

const changeTotalSeats = async() => {
    console.log("set total seat button pressed")
    const total = {
        maths:MathsTotalSeats,
        physics:PhysicsTotalSeats,
        chemistry:ChemistryTotalSeats
    }
    await fetch('/changeTotalSeats', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(total)
    })
    alert('Changed Total Seats')
    navigate('/')  
}

    const deleteAllSeats = async() => {
        console.log("delete clicked")
        try {
            await fetch('/deleteAllSeats', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (err) {
            console.log(err)
        }
        alert('Cancelled all classes')
        navigate('/')
    }

    return (
        <div>
            
            {
                registeredUser === "admlin" ?
                 <> 
                               <input
                               style={{width:'10rem', margin:'2rem'}}
                                type="text"
                                placeholder="Set Maths Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={MathsTotalSeats}
                                required
                                onChange={(event) => {
                                    setMathsTotalSeats(event.target.value);
                                }}
                            />
                            
                               <input
                               style={{width:'10rem', margin:'2rem'}}
                                type="text"
                                placeholder="Set Physics Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={PhysicsTotalSeats}
                                required
                                onChange={(event) => {
                                    setPhysicsTotalSeats(event.target.value);
                                }}
                            />
                            
                               <input
                               style={{width:'10rem', margin:'2rem'}}
                                type="text"
                                placeholder="Set Chemistry Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={ChemistryTotalSeats}
                                required
                                onChange={(event) => {
                                    setChemistryTotalSeats(event.target.value);
                                }}
                            />
                            <button 
                           
                            onClick={changeTotalSeats}
                            style={{ width: '10rem' }}>set and go back</button>

                             <Button variant="danger"
                            type="submit"
                            onClick={deleteAllSeats}
                            style={{ width: '10rem' }}>Delete</Button>



                admin can set the seats
                
                
                <Grid container spacing={9}>
                            <Grid item md={3}>
                                <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                                    <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Maths Class List</b><br/>Total Seats : {MathsTotalSeats} </center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
    
                                            <div style={{ overflow: 'scroll', height: '9rem' }} >
                                                <center>{printStudents(mathsStudentsArray)}</center>
    
                                            </div>
    
                                        </blockquote>
                                    </Card.Body>
    
                                </Card>
                            </Grid>
                            {/*  */}
                            <Grid item md={3}>
                                <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                                    <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Physics Class List</b><br/>Total Seats : {PhysicsTotalSeats} </center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
    
                                            <div style={{ overflow: 'scroll', height: '9rem' }} >
                                                <center>{printStudents(physicsStudentsArray)}</center>
    
                                            </div>
    
                                        </blockquote>
                                    </Card.Body>
    
                                </Card>
                                {/*  */}
                            </Grid>
                            <Grid item md={3}>
    
                                <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                                    <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Chemistry Class List</b><br/>Total Seats : {ChemistryTotalSeats} </center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
    
                                            <div style={{ overflow: 'scroll', height: '9rem' }} >
                                                <center>{printStudents(chemistryStudentsArray)}</center>
    
                                            </div>
    
                                        </blockquote>
                                    </Card.Body>
    
                                </Card>
                            </Grid>
    
                        </Grid>
    
                 </> : 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                <>
                {handleSubmitPreference ?
                    <div>
                        <Alert width='2rem' variant='warning'>
                            *Note : Everyday at 3am fresh booking will start
                        </Alert>
                        {setDate()}
    
                        <Grid container spacing={9}>
                            <Grid item md={3}>
    
                                {/* maths */}
                                <div className="book">
                                    <Card style={{ width: '13rem', marginLeft: '11rem', marginTop: '-15rem' }}>
                                        <Card.Header style={{ backgroundColor: '#7DEDFF' }}>
                                            <center><b>Math</b></center>
                                        </Card.Header>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
    
    
                                                <center><b>Total Seats : {MathsTotalSeats} </b></center>
                                                <center><b>Filled Seats : {MathsOccupiedSeats} </b></center>
    
    
                                            </blockquote>
    
    
                                            <div style={{ margin: '1rem' }} >
                                                {disableMaths ? <Button variant="primary"
                                                    type="submit"
                                                    disabled={limitMaths}
                                                    onClick={handleMaths}
                                                    style={{ width: '8rem' }}>Book NOW</Button>
                                                    :
                                                    <Button
                                                        // disable={disableMaths}
                                                        type="submit"
                                                        variant='danger'
                                                        onClick={cancelMaths}
                                                        style={{ width: '8rem' }}>Cancel Now</Button>
                                                }
                                            </div>
    
                                        </Card.Body>
                                        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                            <b><center>{MathsOccupiedSeats >= MathsTotalSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>}</center></b>
                                        </Card.Header>
                                    </Card>
                                </div>
    
                            </Grid>
    
                            <Grid item md={3}>
    
                                {/* // physics */}
                                <div className="book">
                                    <Card style={{ width: '13rem', marginLeft: '11rem', marginTop: '-15rem' }}>
                                        <Card.Header style={{ backgroundColor: '#7DEDFF' }}>
                                            <center><b>Physics</b></center></Card.Header>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
    
    
                                                <center><b>Total Seats : {PhysicsTotalSeats} </b></center>
                                                <center><b>Filled Seats : {PhysicsOccupiedSeats} </b></center>
    
    
                                            </blockquote>
    
                                            <div style={{ margin: '1rem' }} >
    
    
                                                {disablePhysics ? <Button variant="primary"
                                                    type="submit"
                                                    onClick={handlePhysics}
                                                    disabled={limitPhysics}
                                                    style={{ width: '8rem' }}>Book NOW</Button>
    
                                                    :
                                                    <Button 
                                                        type="submit"
                                                        variant='danger'
                                                        onClick={cancelPhysics}
                                                        style={{ width: '8rem' }}>Cancel Now</Button>
                                                }
    
                                            </div>
    
                                        </Card.Body>
                                        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                            <b><center>{PhysicsOccupiedSeats >= PhysicsTotalSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>}</center></b>
                                        </Card.Header>
    
                                    </Card>
                                </div>
    
                            </Grid>
                            <Grid item md={3}>
    
                                {/* chemistry */}
    
                                <div className="book">
                                    <Card style={{ width: '13rem', marginLeft: '11rem', marginTop: '-15rem' }}>
                                        <Card.Header style={{ backgroundColor: '#7DEDFF' }}><center><b>Chemistry</b></center></Card.Header>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
    
    
                                                <center><b>Total Seats : {ChemistryTotalSeats} </b></center>
                                                <center><b>Filled Seats : {ChemistryOccupiedSeats} </b></center>
    
    
                                            </blockquote>
    
                                            <div style={{ margin: '1rem' }} >
    
                                                {disableChemistry ? <Button variant="primary"
                                                    type="submit"
                                                    disabled={limitChemistry}
    
                                                    onClick={handleChemistry}
                                                    style={{ width: '8rem' }}>Book NOW</Button>
    
                                                    :
                                                    <Button 
                                                        type="submit"
                                                        variant='danger'
                                                        onClick={cancelChemistry}
                                                        style={{ width: '8rem' }}>Cancel Now</Button>
                                                }
    
                                            </div>
    
    
                                        </Card.Body>
                                        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                           
                                            <b><center>{ChemistryOccupiedSeats === ChemistryTotalSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>}</center></b>
                                        </Card.Header>
    
                                    </Card>
                                </div>
    
    
                            </Grid>
                        </Grid>
    
    
                       {/* list of students was here  */}
    
                        <div style={{ marginLeft: '40rem', marginTop: '4rem' }} ><Button variant="success"
                            type="submit"
                            onClick={handleSubmit}
                            style={{ width: '10rem' }}>Final Submit</Button>
                        </div>
    
                        {/* {mathsStudentsArray}  */}
    
    
                        {/* input field */}
    
                        <div style={{ width: '15rem', marginLeft: '4rem', marginTop: '2rem' }}
                            className="form-group">
    
                            <input
                                type="text"
                                placeholder="UserName"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={userName}
                                required
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                            />
                        </div>
    
    
                        <div style={{ width: '15rem', marginLeft: '4rem', marginTop: '2rem' }}
                            className="form-group">
    
                            <input
                                type="text"
                                placeholder="Reg No"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={RegNo}
                                required
                                onChange={(event) => {
                                    setRegNo(event.target.value);
                                }}
                            />
                        </div>
    
    
    
                        {/* end input field */}
    
    
                    </div>
    
    
                    :
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
                    <div>
                       
                        <SubjectPreference
                            userName={userName}
                            RegNo={RegNo}
                            Maths={Maths}
                            Physics={Physics}
                            Chemistry={Chemistry}
                        />
    
                    </div>
    
                }
                </>
    
          
            }
  </div>
            
    );
};

export default VaccinationDetails;