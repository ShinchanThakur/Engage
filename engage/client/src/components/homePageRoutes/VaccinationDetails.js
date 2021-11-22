import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectPreference from './subjectPreference/SubjectPreference';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Alert from 'react-bootstrap/Alert'

const VaccinationDetails = props => {
    const[registeredUser, setRegisteredUser] = useState("") ;
    const[MathsSeats, setMathsSeats] = useState() ;
    const[PhysicsSeats, setPhysicsSeats] = useState() ;
    const[ChemistrySeats, setChemistrySeats] = useState() ;
    

    const [userName, setUserName] = useState("");
    const [RegNo, setRegNo] = useState("");

    const [disableMaths, setDisableMaths] = useState(true);
    const [Maths, setMath] = useState(false);
    const [MathsClassList, setMathsClassList] = useState(0);
    const [limitMaths, setlimitMaths] = useState(false);
    const [mathsStudents, setMathsStudents] = useState([]);

    const [disablePhysics, setDisablePhysics] = useState(true);
    const [Physics, setPhysics] = useState(false);
    const [PhysicsClassList, setPhysicsClassList] = useState(0);
    const [limitPhysics, setlimitPhysics] = useState(false);
    const [physicsStudents, setPhysicsStudents] = useState([]);

    const [disableChemistry, setDisableChemistry] = useState(true);
    const [Chemistry, setChemistry] = useState(false);
    const [ChemistryClassList, setChemistryClassList] = useState(0);
    const [limitChemistry, setlimitChemistry] = useState(false);
    const [chemistryStudents, setChemistryStudents] = useState([]);
    // const[FullChemistry,isFullChemistry] = useState(false) ;

    const [handleSubmitPreference, sethandleSubmitPreference] = useState(true);



    let newDate, day;
    var dayNames =  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let month ;


    const doubtSession = () => {

        newDate = new Date();
        
        day = dayNames[newDate.getDay()];
        month = monthNames[newDate.getMonth()] ;
        // var tomorrow = setDate(newDate.getDate()+1) ;
            return <Alert width='2rem' variant='primary'>
                Now book your class for <b> {day} (tomorrow) </b> doubt session
            </Alert>

        
       
    }



    const [state, setState] = useState({});
    useEffect(() => {

       setRegisteredUser("admin") ;
    //    let a ;
    //    let b ;
    //    let c ; 
    //    if ( registeredUser === "admin")
       {
        axios.get('http://localhost:5200/seats/')
                .then(response => {
                
                  setMathsSeats ( response.data[0].maths) ;
                  setPhysicsSeats (response.data[0].physics) ;
                  setChemistrySeats(response.data[0].chemistry) ;
                //    a = MathsSeats, b = PhysicsSeats, c = ChemistrySeats ;
         
                })
                .catch((error) => {
                    console.log(error);
                })
       }
      
        // day = newDate.getDay();
        // var hr = newDate.getHours();
        // var mn = newDate.getMinutes();
        // var sc = newDate.getSeconds();
        // console.log(hr);
       



        var countMaths = 0, countPhysics = 0, countChemistry = 0;
        axios.get('http://localhost:5200/infos/')
            .then(response => {

                var studentM = [], studentP = [], studentC = [];
                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].Maths === true) {
                        countMaths++;
                        studentM.push(response.data[i].RegNo + " - " + response.data[i].userName)
                    }
                    if (response.data[i].Physics === true) {
                        countPhysics++;
                        studentP.push(response.data[i].RegNo + " - " + response.data[i].userName)
                    }
                    if (response.data[i].Chemistry === true) {
                        countChemistry++;
                        studentC.push(response.data[i].RegNo + " - " + response.data[i].userName)
                    }


                }
                setMathsStudents(studentM);
                setPhysicsStudents(studentP)
                setChemistryStudents(studentC);

                setMathsClassList(countMaths);
                setPhysicsClassList(countPhysics);
                setChemistryClassList(countChemistry);

                axios.get('http://localhost:5200/seats/')
                .then(response => {
                
                    if (countMaths >= response.data[0].maths) setlimitMaths(true);
                    else if (countMaths < response.data[0].maths) setlimitMaths(false);
                    if (countPhysics >= response.data[0].physics) setlimitPhysics(true);
                    else if (countPhysics < response.data[0].physics) setlimitPhysics(false);
                    if (countChemistry >= response.data[0].chemistry) setlimitChemistry(true);
                    else if (countChemistry < response.data[0].chemistry) setlimitChemistry(false);
                    // console.log(countChemistry+" " +response.data[0].chemistry)
                //   setMathsSeats ( response.data[0].maths) ;
                //   setPhysicsSeats (response.data[0].physics) ;
                //   setChemistrySeats(response.data[0].chemistry) ;
                //    a = MathsSeats, b = PhysicsSeats, c = ChemistrySeats ;
         
                })
                .catch((error) => {
                    console.log(error);
                })

           
            // console.log(countChemistry + " " + ChemistrySeats) 
            // console.log(a)

            })
            .catch((error) => {
                console.log(error);
            })

            return () => {
                setState({}); // This worked for me
              };
            

    }, []);


    const handleSubmit = (event) => {
        if (userName != "" && RegNo != "") {
            const info = {
                userName: userName,
                RegNo: RegNo,
                Maths: Maths,
                Physics: Physics,
                Chemistry: Chemistry,

            }
            axios.post('http://localhost:5200/infos/add', info)
                .then(res => 
                    console.log(res.data));

            sethandleSubmitPreference(false);
        }
        else {
            alert("please enter the details")
        }
    }



    const handleMaths = (event) => {
        setDisableMaths(false); // to enable red button of cancel now
        setMathsClassList(MathsClassList + 1);  // to increment the total count of maths students 
        setMath(true) // for that particular student set true as he clicked on book now 
    }
    const cancelMaths = (event) => {
        setDisableMaths(true);
        setMathsClassList(MathsClassList - 1);
        setMath(0)
    }

    const handlePhysics = (event) => {
        setDisablePhysics(false);
        setPhysicsClassList(PhysicsClassList + 1);
        setPhysics(true)
    }
    const cancelPhysics = (event) => {
        setDisablePhysics(true);
        setPhysicsClassList(PhysicsClassList - 1);
        setPhysics(false)

    }

    const handleChemistry = (event) => {
        setDisableChemistry(false);
        setChemistryClassList(ChemistryClassList + 1);
        setChemistry(true);
    }
    const cancelChemistry = (event) => {
        setDisableChemistry(true);
        setChemistryClassList(ChemistryClassList - 1);
        setChemistry(false);
    }

    const printStudents = (event) => {
        if (event.length == 0) {
            return <h5>EMPTY CLASS :( </h5>
        }
        return event.map((item, i) => (
            <h5 key={i}>{item}</h5>
        ))
    }

    const totalSet = () => {
        // console.log(event)
        console.log("set total seat button pressed")
        const total = {
            maths:MathsSeats,
            physics:PhysicsSeats,
            chemistry:ChemistrySeats
        }
        axios.get('http://localhost:5200/seats/deleteAll/')
        .then(response => {
            //  console.log(response)

        })
        .catch((error) => {
            console.log(error);
        })

        axios.post('http://localhost:5200/seats/add', total)
                .then(res => console.log(res.data));
        
    }
    const deleteStudents = (event) => {
        //  if ( registeredUser === "admin" ) {
     console.log("delete clicked")
            axios.get('http://localhost:5200/infos/deleteAll/')
                .then(response => {
                    //  console.log(response)

                })
                .catch((error) => {
                    console.log(error);
                })
        // }
    }
    // const totalPhysics = () => {
    //     setTotalPhysics(PhysicsSeats) ;
    // }
    // const totalChemistry = () => {
    //     setTotalChemistry(ChemistrySeats) ;
    // }
    {/* <Grid container spacing={24}>
  <Grid item md={3}>
    <Demo />
  </Grid>
  <Grid item md={3}>
    <Demo />
  </Grid>
  <Grid item md={3}>
    <Demo />
  </Grid>
</Grid> */}


    return (
        <div>

            {
                registeredUser === "adlmin" ?
                 <> 
                
                     
                               <input
                               style={{width:'10rem', margin:'2rem'}}
                                type="text"
                                placeholder="Set Maths Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={MathsSeats}
                                required
                                onChange={(event) => {
                                    setMathsSeats(event.target.value);
                                }}
                            />
                            {/* <Button variant="success"
                            type="submit"
                            onClick={totalMaths}
                            style={{ width: '10rem' }}>set </Button> */}
                
                               <input
                               style={{width:'10rem', margin:'2rem'}}
                                type="text"
                                placeholder="Set Physics Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={PhysicsSeats}
                                required
                                onChange={(event) => {
                                    setPhysicsSeats(event.target.value);
                                }}
                            />
                            {/* <Button variant="success"
                            type="submit"
                            onClick={totalPhysics}
                            style={{ width: '10rem' }}>set</Button> */}

                               <input
                               style={{width:'10rem', margin:'2rem'}}
                                type="text"
                                placeholder="Set Chemistry Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={ChemistrySeats}
                                required
                                onChange={(event) => {
                                    setChemistrySeats(event.target.value);
                                }}
                            />
                            <button 
                           
                            // onClick={() => totalSet}
                            onClick={totalSet}
                            style={{ width: '10rem' }}>set and go back</button>

                             <Button variant="danger"
                            type="submit"
                            onChange={deleteStudents}
                            style={{ width: '10rem' }}>Delete</Button>



                admin can set the seats
                
                
                <Grid container spacing={9}>
                            <Grid item md={3}>
                                <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                                    <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Maths Class List</b><br/>Total Seats : {MathsSeats} </center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
    
                                            <div style={{ overflow: 'scroll', height: '9rem' }} >
                                                <center>{printStudents(mathsStudents)}</center>
    
                                            </div>
    
                                        </blockquote>
                                    </Card.Body>
    
                                </Card>
                            </Grid>
                            {/*  */}
                            <Grid item md={3}>
                                <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                                    <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Physics Class List</b><br/>Total Seats : {PhysicsSeats} </center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
    
                                            <div style={{ overflow: 'scroll', height: '9rem' }} >
                                                <center>{printStudents(physicsStudents)}</center>
    
                                            </div>
    
                                        </blockquote>
                                    </Card.Body>
    
                                </Card>
                                {/*  */}
                            </Grid>
                            <Grid item md={3}>
    
                                <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                                    <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Chemistry Class List</b><br/>Total Seats : {ChemistrySeats} </center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
    
                                            <div style={{ overflow: 'scroll', height: '9rem' }} >
                                                <center>{printStudents(chemistryStudents)}</center>
    
                                            </div>
    
                                        </blockquote>
                                    </Card.Body>
    
                                </Card>
                            </Grid>
    
                        </Grid>
    
                
                
                
                
                 </> : 

                <>
                {handleSubmitPreference ?
                    <div>
                        <Alert width='2rem' variant='warning'>
                            *Note : Everyday at 3am fresh booking will start
                        </Alert>
                        {doubtSession()}
    
    
    
    
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
    
    
                                                <center><b>Total Seats : {MathsSeats} </b></center>
                                                <center><b>Filled Seats : {MathsClassList} </b></center>
    
    
                                            </blockquote>
    
    
                                            <div style={{ margin: '1rem' }} >
                                                {disableMaths ? <Button variant="primary"
                                                    type="submit"
                                                    disabled={limitMaths}
                                                    onClick={handleMaths}
                                                    style={{ width: '8rem' }}>Book NOW</Button>
                                                    :
                                                    <Button variant="primary"
                                                        // disable={disableMaths}
                                                        type="submit"
                                                        variant='danger'
                                                        onClick={cancelMaths}
                                                        style={{ width: '8rem' }}>Cancel Now</Button>
                                                }
                                            </div>
    
                                        </Card.Body>
                                        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                            <b><center>{MathsClassList >= MathsSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>}</center></b>
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
    
    
                                                <center><b>Total Seats : {PhysicsSeats} </b></center>
                                                <center><b>Filled Seats : {PhysicsClassList} </b></center>
    
    
                                            </blockquote>
    
                                            <div style={{ margin: '1rem' }} >
    
    
                                                {disablePhysics ? <Button variant="primary"
                                                    type="submit"
                                                    onClick={handlePhysics}
                                                    disabled={limitPhysics}
                                                    style={{ width: '8rem' }}>Book NOW</Button>
    
                                                    :
                                                    <Button variant="primary"
                                                        type="submit"
                                                        variant='danger'
                                                        onClick={cancelPhysics}
                                                        style={{ width: '8rem' }}>Cancel Now</Button>
                                                }
    
                                            </div>
    
                                        </Card.Body>
                                        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                            <b><center>{PhysicsClassList >= PhysicsSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>}</center></b>
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
    
    
                                                <center><b>Total Seats : {ChemistrySeats} </b></center>
                                                <center><b>Filled Seats : {ChemistryClassList} </b></center>
    
    
                                            </blockquote>
    
                                            <div style={{ margin: '1rem' }} >
    
                                                {disableChemistry ? <Button variant="primary"
                                                    type="submit"
                                                    disabled={limitChemistry}
    
                                                    onClick={handleChemistry}
                                                    style={{ width: '8rem' }}>Book NOW</Button>
    
                                                    :
                                                    <Button variant="primary"
                                                        type="submit"
                                                        variant='danger'
                                                        onClick={cancelChemistry}
                                                        style={{ width: '8rem' }}>Cancel Now</Button>
                                                }
    
                                            </div>
    
    
                                        </Card.Body>
                                        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                           
                                            <b><center>{ChemistryClassList === ChemistrySeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>}</center></b>
                                        </Card.Header>
    
                                    </Card>
                                </div>
    
    
                            </Grid>
                        </Grid>
    
    
    
                        {/* <Grid container spacing={24}>
      <Grid item md={3}>
        <Demo />
      </Grid>
      <Grid item md={3}>
        <Demo />
      </Grid>
      <Grid item md={3}>
        <Demo />
      </Grid>
    </Grid> */}
    
                       {/* list of students was here  */}
    
    
    
    
    
    
                        <div style={{ marginLeft: '40rem', marginTop: '4rem' }} ><Button variant="success"
                            type="submit"
                            onClick={handleSubmit}
                            style={{ width: '10rem' }}>Final Submit</Button>
                        </div>
    
    
    
    
    
                        {/* {mathsStudents}  */}
    
    
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