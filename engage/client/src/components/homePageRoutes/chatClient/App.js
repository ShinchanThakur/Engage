
import './App.css';
import io from 'socket.io-client'
import {useState} from "react" ;
import Chat from './Chat';
const socket = io.connect("http://localhost:5200") ;
function ClientApp() {

const[username, setUsername] = useState("") ;
const[room, setRoom] = useState("");
const[showChat, setShowChat] = useState(false) ;


const joinRoom = () => {
if (username !== "" && room !== "")
{
  const data ={
    room: room,
    name: username
  }
   socket.emit("join_room", data) ;
   
   setShowChat(true) ;
   
   
}


};

  return (
    <div className="App">
      {!showChat ?  (
      <div className="joinChatContainer">

      
     <h3> Join A Chat </h3>

     <input type="text" 
     placeholder="Name..." 
     onChange={(event) => {
       setUsername(event.target.value) ;
     }}
     />

     <input type="text"
     placeholder="Romm ID..."
     onChange={(event) => {
       setRoom(event.target.value) ;
     }}
     />

     <button onClick={joinRoom}>Join a Room </button>
     </div> )
: (
<Chat socket={socket} username={username} room={room}/>)
}
    </div>
  );
}

export default ClientApp;
