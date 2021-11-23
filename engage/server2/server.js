const express = require('express');
const cors = require('cors');
const http = require("http")
 const mongoose = require('mongoose');
 const app = express();
const {Server} = require("socket.io") ;
const server = http.createServer(app) ;

 require('dotenv').config();


const port = process.env.PORT || 5200;

app.use(cors());
app.use(express.json());


 const chatRouter = require('./routes/chats');



app.use('/chats', chatRouter);


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHAT SECTION

const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET","POST","DELETE"],
  },
 });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

io.on("connection" , (socket) => {
  console.log(`User Connected: ${socket.id}`) ;

  socket.on("join_room", (data) => {
   socket.join(data.room);
  //  socket.to(data.room).emit('message',`${data.name} has joined the chat`) ;
   console.log(`User with ID : ${socket.id} joined room: ${data.room}`);
  
  })

socket.on("send_message", (data) => {
  console.log(data);
  socket.to(data.room).emit("receive_message", data) ;

});

  socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
  })
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log("server running") ;
});




