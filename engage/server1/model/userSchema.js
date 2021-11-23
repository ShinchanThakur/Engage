const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Defining schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    todoList: [
        {
            text: {
                type: String,
                required: true
            }
        }
    ],
    classes: [
        {
            subject: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// We are hashing the password, using pre and post functions
// which allow doing something before and after calling a function
// These are inbuilt in mongoose
// MIDDLE WARE
userSchema.pre('save', async function (next) {  //This keyword works only with standard functions (and not with arrow functions)
                                                //Therefore we use the keyword function here
    //This function will run before save function

    if(this.isModified('password')) {       //Checking this condition since this needs to be checked only at time of signin and not other times when we use save function
        try{
            this.password = await bcrypt.hash(this.password, 12)
            this.cpassword = await bcrypt.hash(this.password, 12)
        } catch {
            console.log(err)    //Handle it properly (later)
        }
    }
    next()      //This will now allow save function to run
})

userSchema.methods.generateAuthToken = async function () {      //methods => This will make an instance function for userSchema
                                                                //name of instance function is generateAuthToken
    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token})
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }
}

userSchema.methods.addMessage = async function(name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message })    //name: name and so on
        await this.save()
        return this.messages
    } catch (error) {
        console.log(error)
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
// TODO LIST
userSchema.methods.addTodo = async function(text) {
    try {
        this.todoList = this.todoList.concat({ text })
        await this.save()
        return this.todoList
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.deleteTodo = async function(todo) {
    try {
        let index = -1
        for(const a in this.todoList){
            if(this.todoList[a].text === todo.text){
                index = a
                break
            }
        }
        if(index > -1)
            this.todoList.splice(index, 1)
        await this.save()
        return this.todoList
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASS BOOKING

userSchema.methods.addClass = async function(info) {
    try {
        if(info.Maths){
            this.classes = this.classes.concat({subject: "Maths"})
        }
        if(info.Physics){
            this.classes = this.classes.concat({subject: "Physics"})
        }
        if(info.Chemistry){
            this.classes = this.classes.concat({subject: "Chemistry"})
        }
        await this.save()
    } catch (error) {
        console.log(error)
    }
}

//Creating collection with the above schema
const User = mongoose.model('USER', userSchema)

//Exporting collection for use in other components
module.exports = User