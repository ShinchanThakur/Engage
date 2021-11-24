import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat(props) {
const {socket, username, room} = props
const [currentMessage, setCurrentMessage] = useState("");
const[messageList, setMessageList] = useState([]) ;

const saveCurrentMessage = async(messageData) => {
    await fetch('/addChatToItsRoom', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
}

const sendMessage = async() => {
    if ( currentMessage !== "") {
        const messageData = {
            room : props.room,
            author: username,
            message: currentMessage,
            time: 
            new Date(Date.now()).getHours() + 
            ":" + 
            new Date(Date.now()).getMinutes(),
        }
       
        await socket.emit("send_message", messageData) 
        // eslint-disable-next-line
        const { room, author, message, time } = messageData
        const messageForList = { author, message, time }
        setMessageList((list) => [...list, messageForList]) 

        setCurrentMessage ("");
        saveCurrentMessage(messageData)
    }
};

const getPreviousChats = async() => {
    const res = await fetch('/getChatsFromOneRoom', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({room})
    })
    const data = await res.json()
    setMessageList(data)
}

useEffect(() => {
    getPreviousChats()
    // eslint-disable-next-line
},[])

useEffect(() => {   
    socket.on("receive_message", (data) => {
        // eslint-disable-next-line
        const { room, author, message, time } = data
        const messageForList = { author, message, time }
        setMessageList((list) => [...list, messageForList]) ;
    })
},[socket]);

    return (
        <div className="chat-window">

{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
{/* HEADER */}
            <div className="chat-header">   
            <p>{username}  Welcome to Live Chat</p>
            <p>Room Name : {room}</p>
            </div>

            <br/>
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
{/* BODY */}
            <div className="chat-body">
            {/* <div style={{paddingLeft:'15rem', backgroundColor:'white'}}>{message}</div> */}
                <ScrollToBottom className="message-container">
            {messageList.map((messageContent,index) => {
                return (
                    <div className="message"  key={index} 
                    id={username === messageContent.author ? "you" : "other"}
                    >
                        <div> 
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
                </ScrollToBottom>
            </div>

            <br/>
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
{/* FOOTER */}
            <div className="chat-footer">
                <input type="text"
                    placeholder="Hey..."
                    value={currentMessage}
                    onChange={(event) => {
                        setCurrentMessage(event.target.value) ;
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}> &#9658; </button>
            </div>
        </div>
    )
}

export default Chat ;