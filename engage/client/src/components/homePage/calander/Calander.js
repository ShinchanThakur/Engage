import React from "react";
import Card from 'react-bootstrap/Card'

const Calander = () => {
  let newDate = new Date()
  let date = newDate.getDate();
  let year = newDate.getFullYear();

  var dayNames = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = dayNames[newDate.getDay()];
   
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  let month = monthNames[newDate.getMonth()];

  return (
    <div>
      <Card style={{ width: '13rem' }}>
        <Card.Header style={{ backgroundColor: '#7DEDFF' }}><center><b>{month}</b></center></Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">

            <center><b>{date}</b></center>
             

          </blockquote>
        </Card.Body>
        <Card.Header style={{ backgroundColor: '#EEEEEE' }}><b>{day}</b><b style={{ paddingLeft: '6rem' }}>{year}</b></Card.Header>

      </Card>
    </div>

  );
};

export default Calander;