import React, {useRef} from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const SubjectPreference = (props) => {
 
    
    const { userName, RegNo, Maths, Physics, Chemistry } = props;
    const componentRef = useRef() ;
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        
    });
    
    return (
        <>
         <Alert variant="success">
      Congratulations you have got a seat for tomorrow's doubt session 
      </Alert>
        <Alert variant='primary'>
        ***Carry this Reciept whenever you come to class
      </Alert>
     
        <div ref={componentRef} style={{ marginTop: '6rem', marginLeft: '32rem' }}>
           
            <Card style={{ width: '18rem' }}>

                <Card.Header as="h4"><center><b>Receipt</b></center></Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text><b>Name: </b>  {userName}</Card.Text>
                    <Card.Text><b>Registration No:</b> {RegNo}</Card.Text>
                    <br />
                    <Card.Text><b>Subject Booked</b></Card.Text>
                    <Card.Text>{Maths ? "Maths" : ""}</Card.Text>
                    <Card.Text>{Chemistry ? "Chemistry" : ""}</Card.Text>
                    <Card.Text>{Physics ? "Physics" : ""}</Card.Text>
                    {/* <Link to='/VaccinationDetail'> <Button variant="primary">Go Back</Button> </Link> */}
                    {/* <hr /> */}
                    <Link to='/'> <Button variant="primary">Home</Button> </Link>
                    <Button variant="primary" onClick={handlePrint}>Print</Button>
                </Card.Body>
            </Card>

        </div>
        </>


    );
};

export default SubjectPreference;

