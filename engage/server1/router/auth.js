const express = require('express')
const router = express.Router()         //Express router
const bcrypt = require('bcryptjs')      //Hashing
const authenticate = require('../middleware/authenticate')

//Databse Connection
require('../db/conn')
const User = require('../model/userSchema')
const Classes = require('../model/classSchema')
const StudentClassList = require('../model/studentClassList')
const ChatRooms = require('../model/chatRoomSchema')

//Creating routes
router.get('/', (req, res) => {         //If we write app.get in app.js then which would run?
    res.send('Home Page')               //Answer: The one in which is written at top will be run and the other will be ignored
})                                      //as Javascript runs from top to down

// //Middleware
// const middleware = (req, res, next) => {
//     console.log(`Middleware`)
//     next()
// }

// router.get('/about', middleware, (req, res) => {
//     console.log(`About`)
//     res.send('About Page')
// })

router.get('/contact', (req, res) => {
    // res.cookie("Test", 'anshu')     //It is this easy to store a cookie :)
    res.send('Contact Page')
})

/*************************************************************************************************************************** */

//USING PROMISES

// router.post('/register', (req, res) => {
//     // console.log(req.body)           //Print on console
//     //                                 //Normally it would not print like this, it would show undefined
//     //                                 //but we used express.json in app.js to easily deal with json
//     //                                 //Other alternative is to write it like this req.body.stringify()

//     // res.json({message: req.body})   //Print on postman

//     const { name, email, phone, work, password, cpassword } = req.body
//                                         //Object destruction -> Helps to name different parts of json file
    
//     if( !name|| !email|| !phone|| !work|| !password|| !cpassword)
//         // return res.json({ err: "fill everything"})
//         return res.status(422).json({ err: "Please fill all fields"})      //Returning with status code

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if(userExist) {
//                 return res.status(422).json({ err: "Email already exists"})     //422 => client side error (semantics error)
//             }
//             // const user = new User(req.body)
//             // const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword })
//             const user = new User({ name, email, phone, work, password, cpassword })
//                                     //This is same as above because starting with ES6, if the name of key and value in json file is same, then writing only one is sufficient
//             user.save().then(() => {
//                 res.status(201).json({ message: "User Registered successfully" })       //201 => success
//             }).catch((err) => {
//                 res.status(500).json({ error: "Failed to register"})        //500 => Databse error
//             })
//         }).catch(err => {console.log(err)})
// })

/*************************************************************************************************************************** */

//USING ASYNC-AWAIT

router.post('/register', async (req, res) => {      //If there are promises in a function, then make it async
        const { name, email, phone, work, password, cpassword } = req.body
        
        if( !name|| !email|| !phone|| !work|| !password|| !cpassword)
            return res.status(422).json({ err: "Please fill all fields"})

        try{        //Promises should be kept in try block
            const userExist = await User.findOne({ email: email })      //Use await before promise
            if(userExist) {
                return res.status(422).json({ error: "Email already exists"})
            } else if(password != cpassword) {
                return res.status(422).json({ error: "Passwords do not match"})
            } else {
                const user = new User({ name, email, phone, work, password, cpassword })

                //Before save function, we have set a middleware to run in userSchema.js
                await user.save()
                res.status(201).json({ message: "User Registered successfully" })
            }
            
        } catch (err) {
            console.log(err)
        }
    })

/********************************************************************************************************************** */

router.post('/signin', async (req, res) => {
    try {
        console.log('login request')
        let token   //Defining it here so that we can use it anywhere
        const { email, password } = req.body
        if( !email || !password) {
            return res.status(400).json({error: "Please fill all fields"})
        }

        const userLogin = await User.findOne({ email: email })

        //For security reasons, never tell a user that password is wrong or email is wrong
        //Just tell them that the credentials do not match, it makes hacking more difficult

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken()
            const oneMonth = 25892000000    //milliseconds
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + oneMonth),
                httpOnly: true
            })
            if(!isMatch) {
                res.status(400).json({ error: "Invalid credentials"})
            } else {
                res.status(201).json({ message: "User signin success"})
            }
        } else {
            res.status(400).json({ error: "Invalid credentials"})
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/about', authenticate, (req, res) => {      //authenticate is a middleware
    res.send(req.rootUser)
})

router.get('/getdata', authenticate, (req, res) => {
    console.log('getdata called')
    res.send(req.rootUser)
})

router.post('/contact', authenticate, async (req, res) => {
    try {
        
        const { name, email, phone, message } = req.body

        if( !name || !email || !phone || !message ) {
            console.log("all fields not filled in contact form")
            return res.status(422).json({ error: "please fill all fields in the contact form"})
        }

        const userContact = await User.findOne({_id: req.userID })      //here req has all details like _id because we have stored it during authentication

        if(userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message)
            res.status(201).json({ message: "Message sent successfully"})
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', (req, res) => {
    console.log('logout')
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send('User logout')
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO

router.post('/todo/add', authenticate, async (req, res) => {
    try {
        const { text } = req.body
        const currentUser = await User.findOne({_id: req.userID })      //here req has all details like _id because we have stored it during authentication

        if(currentUser) {
            const todoList = await currentUser.addTodo(text)
            res.status(201).json({ message: "Todo added successfully"})
        }

    } catch (error) {
        console.log(error)
    }
})

router.post('/todo/delete', authenticate, async (req, res) => {
    try {
        const todo = req.body
        const currentUser = await User.findOne({_id: req.userID })      //here req has all details like _id because we have stored it during authentication

        if(currentUser) {
            const todoList = await currentUser.deleteTodo(todo)
            res.status(201).json(todoList)
        }

    } catch (error) {
        console.log(error)
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  CLASS BOOKING
//  STUDENT
router.post('/addClass', authenticate, async (req, res) => {
    try {
        const info = req.body
        const currentUser = await User.findOne({_id: req.userID })
        if(currentUser) {
            await currentUser.addClass(info)
            await Classes.addSeats(info)
            await StudentClassList.addClass(info, req.userID, req.rootUser.name)
            res.status(201).json({ message: "Class registration successful"})
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/getTotalSeats', async (req, res) => {
    console.log('getTotalSeats called')
    const totalSeats = await Classes.getTotalSeats()      //Add exception handling
    res.send(totalSeats)
})

router.get('/getOccupiedSeats', async (req, res) => {
    console.log('getOccupiedSeats called')
    const occupiedSeats = await Classes.getOccupiedSeats()    //Add exception handling
    res.send(occupiedSeats)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//  CLASS BOOKING
//  ADMIN

router.post('/changeTotalSeats', async (req, res) => {
    try {
        const total = req.body
        await Classes.changeTotalSeats(total)
    } catch (error) {
        console.log(error)
    }
})

router.get('/deleteAllSeats', async (req, res) => {
    console.log('deleteAllSeats called')
//  SEND MESSAGE TO ALL USERS IN STUDENT CLASS LIST SO THAT THEY KNOW THAT THE CLASS HAS TO BOOKED AGAIN
//  OR HAS BEEN CANCELLED
    await StudentClassList.deleteAllSeats()    //Add exception handling
    await Classes.resetOccupiedSeats()
})

router.get('/getStudentClassList', async (req, res) => {
    console.log('getStudentClassList called')
    const studentClassList = await StudentClassList.getStudentClassList()    //Add exception handling
    res.send(studentClassList)
})
/////////////////////////////////////////////////////////////////////////////////
//  QUIZ DETAILS

router.post('/setUserQuizMarks', authenticate, async (req, res) => {
    try {
        const percentage = req.body.percentage
        const currentUser = await User.findOne({_id: req.userID })
        if(currentUser) {
            await currentUser.addLastQuizMarks(percentage)
            res.status(201).json({ message: "Last quiz marks added to user"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

/////////////////////////////////////////////////////////////////////////////////
//  CHATROOMS in USER SCHEMA

router.get('/getChatRoomList', authenticate, async(req, res) => {
    console.log('getChatRoomList called')
    const currentUser = await User.findOne({_id: req.userID })
    const chatRoomList = await currentUser.getChatRoomList()
    res.send(chatRoomList)
})

router.post('/addRoomNameToUsersChatRoomList', authenticate, async(req, res) => {
    console.log('addRoomNameToUsersChatRoomList called')
    const currentUser = await User.findOne({_id: req.userID })
    const roomName = req.body.roomName
    await currentUser.addChatRoom(roomName)
    let chatRoom = await ChatRooms.findOne({roomName})
    if(chatRoom === null) {
        chatRoom = new ChatRooms({ roomName })
        await chatRoom.save()
        console.log('new chat room created')
    }
})

/////////////////////////////////////////////////////////////////////////////////
//  CHATROOMS

router.post('/getChatsFromOneRoom', async(req, res) => {
    console.log('getChatsFromOneRoom called')
    const roomName = req.body.room
    const chatRoom = await ChatRooms.findOne({roomName})
    let chats
    if(chatRoom)
        chats = await chatRoom.getChats()
    else
        chats = []
    res.send(chats)
})

router.post('/addChatToItsRoom', async(req, res) => {
    const { room, author, message, time } = req.body
    const chatRoom = await ChatRooms.findOne({roomName: room})
    const chat = { author, message, time }
    await chatRoom.addChat(chat)
})

/////////////////////////////////////////////////////////////////////////////////

// REPLACE AUTHENTICATE AT UNNECESSARY PLACES WITH USERNAME AND USER ID IF POSSIBLE