//Express
const express = require("express")
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

//Environment Variables
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})

//Database
// require("./db/conn")
//Collection Users in database
// const User = require('./model/userSchema')

//Allows us to deal with json easily (read/write)
app.use(express.json())

//Routes
app.use(require('./router/auth'))

//Starting server

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server started on port', port)
})


//CHECKING USER AND ALLOWING HIM HIS DATA
// 1. Generate JWT Token and store it in database
// 2. Store the token in cookies
// 3. Get token from cookies and verify the user