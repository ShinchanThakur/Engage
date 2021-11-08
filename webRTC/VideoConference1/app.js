// 1. Create 3 files: public/index.html
//                     public/main.js
//                     app.js
//    main.js is our client side
//    app.js is our server side (It contains a signalling server)
// 2. Ininitalize the folder as node project by running command: npm init -y
// 3. Add express dependency by running command: npm install -S express
// 4. Write basic code to get video stream from local pc on the browser
// 5. Now its time to make connection to a peer, For this we will use socket.io library
//    Add socket.io library by running command: npm install -S socket.io
// 6. Write code to connect peers one to one in different rooms

const express = require('express')  //Require express dependency
const app = express()   //app variable will be linked to express engine
let http = require('http').Server(app)  //Require http and bend it to the app

const port = process.env.PORT || 3000  //Setting it to environment variable so that we can manipulate the port on which the application will be running
                                        //Also adding a fallback value 3000

const io = require('socket.io')(http)     //socket.io requires http for initial handhsake (not sure why this bracket is used)

app.use(express.static('public'))   //Using express framework to configure static hosting for the public folder

http.listen(port, () => {   //Setting up html listener to listen on the port we have already defined
    console.log('listening on the port number', port)
})

io.on('connection', socket => {     //Connecting to socket.io library everytime a new user comes in
    console.log('A user connected')

    socket.on('create or join', room => {
        console.log('create or join to room', room)
        room = room.trim()
        const myRoom = io.sockets.adapter.rooms.get(room) || {size: 0}
        const numClients = myRoom.size
        console.log(room, 'has', numClients, 'clients')

        if(numClients === 0){
            socket.join(room)       //join function is used to create a new room or join a previous one
                                    //Here it is being used to create a new room
            socket.emit('created', room)    //A message ("created") is being emitted or sent and the room is passed as a parameter
        } else if(numClients === 1) {
            socket.join(room)       //Here join function is being used to join an already created room
            socket.emit('joined', room)
        } else {        //We are creating one to one video call, therefore maximum two people are allowed
            socket.emit('full', room)
        }
    })

    socket.on('ready', room => {
        socket.broadcast.to(room).emit('ready')
    })

    socket.on('candidate', event => {
        socket.broadcast.to(event.room).emit('candidate', event)
    })

    socket.on('offer', event => {
        socket.broadcast.to(event.room).emit('offer', event.sdp)
    })

    socket.on('answer', event => {
        socket.broadcast.to(event.room).emit('answer', event.sdp)
    })
})