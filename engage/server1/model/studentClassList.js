const mongoose = require('mongoose')

const studentClassListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASS BOOKING

studentClassListSchema.statics.addClass = async function(info, id, name) {
    try {
        if(info.Maths){
            const maths = new StudentClassList({ name, id, subject: "maths" })
            await maths.save()
        }
        if(info.Physics){
            const physics = new StudentClassList({ name, id, subject: "physics" })
            await physics.save()
        }
        if(info.Chemistry){
            const chemistry = new StudentClassList({ name, id, subject: "chemistry" })
            await chemistry.save()
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  DATA RETREIVEL

studentClassListSchema.statics.getStudentClassList = async function() {
    try {
            const list = await StudentClassList.find()
            return list
    } catch (error) {
        console.log(error)
    }
}

studentClassListSchema.statics.deleteAllSeats = async function() {
    try {
//  SEND MESSAGE TO ALL USERS IN STUDENT CLASS LIST SO THAT THEY KNOW THAT THE CLASS HAS TO BOOKED AGAIN
//  OR HAS BEEN CANCELLED
//  It can be easily done by adding inbox in userSchema and adding a message there for every entry in studentClassList
//  as we have user id of all users and send them subject name and date of cancel
        console.log('deleteAll called')
        await StudentClassList.deleteMany()
    } catch (error) {
        console.log(error)
    }
}

// studentClassListSchema.statics.getOccupiedSeats = async function() {
//     try {
//             const maths = await this.findOne({ subject: "maths"})
//             const physics = await this.findOne({ subject: "physics"})
//             const chemistry = await this.findOne({ subject: "chemistry"})
//             return {maths: maths.occupiedSeats, physics: physics.occupiedSeats, chemistry: chemistry.occupiedSeats}
//     } catch (error) {
//         console.log(error)
//     }
// }

/////////////////////////////////////////////////////////////////////////////////////////

const StudentClassList = mongoose.model('STUDENTCLASSLIST', studentClassListSchema)
module.exports = StudentClassList