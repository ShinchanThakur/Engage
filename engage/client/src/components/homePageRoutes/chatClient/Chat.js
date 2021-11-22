import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({socket, username, room}) {

const [currentMessage, setCurrentMessage] = useState("");
const[messageList, setMessageList] = useState([]) ;

const sendMessage = async() => {
    if ( currentMessage !== "") {
        const messageData = {
            room : room,
            author: username,
            message: currentMessage,
            time: 
            new Date(Date.now()).getHours() + 
            ":" + 
            new Date(Date.now()).getMinutes(),
        };
       
        await socket.emit("send_message", messageData) ;
        setMessageList((list) => [...list, messageData]) ;

 

        setCurrentMessage ("");
        // saveData() ;
    }
};

useEffect(() => {
    
    socket.on("receive_message", (data) => {
    //  console.log(data);
     setMessageList((list) => [...list, data]) ;

    });

    

   


},[socket]);

    return (
        <div className="chat-window">

       <div className="chat-header">   
       <p>{username}  Welcome to Live Chat</p>
       <p>Room Name : {room}</p>
       </div>

     <br/>
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