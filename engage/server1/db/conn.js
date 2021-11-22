//Database

const mongoose = require("mongoose")
const DB = process.env.DATABASE

// {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

mongoose.connect(DB).then(() => {
    console.log(`connection successful`)
}).catch((err) => {
    console.log(`no connection`, err)
})