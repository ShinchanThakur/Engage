import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from "react" ;
import Chat from './Chat';
const socket = io.connect("http://localhost:5200") ;

function ClientApp() {
  const [username, setUserName] = useState("")
  const[room, setRoom] = useState("");
  const[showChat, setShowChat] = useState(false)
  const[previousChatRoomList, setPreviousChatRoomList] = useState([])

  const getChatRoomList = async() => {
    try {
      const res = await fetch('/getChatRoomList', {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
      const data = await res.json()
      setPreviousChatRoomList(data)
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(() => {
    setUserName(localStorage.getItem('userName'))
    getChatRoomList()
  // eslint-disable-next-line
  },[])

  const addRoomNameToUsersChatRoomList = async() => {
    await fetch("/addRoomNameToUsersChatRoomList", { 
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ 
                roomName: room
              })
        })
  }

  const joinRoom = () => {
    if (username !== "" && room !== "")
    {
      const data ={
        room: room,
        name: username
      }
      socket.emit("join_room", data) ;
      setShowChat(true) ;
      addRoomNameToUsersChatRoomList()
    }
  }

  const openRoom = async(e) => {
    const roomName = e.target.innerHTML
    await setRoom(roomName)
    joinRoom()
  }

  const askRoomNameToJoin = () => {
    return (
      <>
      <div className="joinChatContainer">

        <h3> Join A Chat </h3>

        <input type="text"
        placeholder="Romm ID..."
        onChange={(event) => {
          setRoom(event.target.value) ;
        }}
        />

        <button onClick={joinRoom}>Join a Room </button>
      </div> 
      <h3>You may choose previously used room</h3>
      <div className="list-group">
        {previousChatRoomList.map((roomList,index) => {
                return (
                    <button type="button" key={index} className="list-group-item list-group-item-action" onClick={openRoom}>{roomList.roomName}</button>

                    //Other ways to do the same thing with ease
                    //<div className="keyboardRow roundBorder" value={"example"} onClick={e => this.handleInput(e, "value")} >
                    //handleInput(e) {
                    //   console.log(e.target.value);
                    //}
                )
        })}
    </div>
      </>
    )
  }

  return (
    <div className="App">
      {!showChat ?  askRoomNameToJoin(): (<Chat socket={socket} username={username} room={room}/>)}
    </div>
  );
}

export default ClientApp;
