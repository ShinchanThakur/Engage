const express = require('express');
const cors = require('cors');
const http = require("http")
 const app = express();
const {Server} = require("socket.io") ;
const server = http.createServer(app) ;
require('dotenv').config();
const port = process.env.PORT || 5200;
app.use(cors());
app.use(express.json());


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHAT SECTION

const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET","POST","DELETE"],
  },
 });


io.on("connection" , (socket) => {
  // console.log(`User Connected: ${socket.id}`) ;

  socket.on("join_room", (data) => {
   socket.join(data.room);
  //  socket.to(data.room).emit('message',`${data.name} has joined the chat`) ;
  //  console.log(`User with ID : ${socket.id} joined room: ${data.room}`);
  })

socket.on("send_message", (data) => {
  console.log(data);
  socket.to(data.room).emit("receive_message", data) ;

});

  socket.on("disconnect", () => {
      // console.log("User Disconnected", socket.id);
  })
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log("server running") ;
});




