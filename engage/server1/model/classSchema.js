const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    occupiedSeats: {
        type: Number,
        required: true
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASS BOOKING

classSchema.statics.addSeats = async function(info) {
    try {
        if(info.Maths){
            const maths = await this.findOne({ subject: "maths"})
            maths.occupiedSeats = maths.occupiedSeats + 1
            await maths.save()
        }
        if(info.Physics){
            const physics = await this.findOne({ subject: "physics"})
            physics.occupiedSeats = physics.occupiedSeats + 1
            await physics.save()
        }
        if(info.Chemistry){
            const chemistry = await this.findOne({ subject: "chemistry"})
            chemistry.occupiedSeats = chemistry.occupiedSeats + 1
            await chemistry.save()
        }
    } catch (error) {
        console.log(error)
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INITIAL INSERTION IN THE COLLECTION => Done in some other file

// const classesm = new Classes({ subject: "maths", totalSeats: 12, occupiedSeats: 1 })
// await classesm.save()
// const classesp = new Classes({ subject: "physics", totalSeats: 12, occupiedSeats: 1 })
// await classesp.save()
// const classesc = new Classes({ subject: "chemistry", totalSeats: 12, occupiedSeats: 0 })
// await classesc.save()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  DATA RETREIVEL

classSchema.statics.getTotalSeats = async function() {
    try {
            const maths = await this.findOne({ subject: "maths"})
            const physics = await this.findOne({ subject: "physics"})
            const chemistry = await this.findOne({ subject: "chemistry"})
            return {maths: maths.totalSeats, physics: physics.totalSeats, chemistry: chemistry.totalSeats}
    } catch (error) {
        console.log(error)
    }
}

classSchema.statics.getOccupiedSeats = async function() {
    try {
            const maths = await this.findOne({ subject: "maths"})
            const physics = await this.findOne({ subject: "physics"})
            const chemistry = await this.findOne({ subject: "chemistry"})
            return {maths: maths.occupiedSeats, physics: physics.occupiedSeats, chemistry: chemistry.occupiedSeats}
    } catch (error) {
        console.log(error)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
//  RESET

classSchema.statics.resetOccupiedSeats = async function() {
    try {
            const maths = await this.findOne({ subject: "maths"})
            const physics = await this.findOne({ subject: "physics"})
            const chemistry = await this.findOne({ subject: "chemistry"})
            maths.occupiedSeats = 0
            physics.occupiedSeats = 0
            chemistry.occupiedSeats = 0
            await maths.save()
            await physics.save()
            await chemistry.save()
    } catch (error) {
        console.log(error)
    }
}

classSchema.statics.changeTotalSeats = async function(total) {
    try {
            const maths = await this.findOne({ subject: "maths"})
            const physics = await this.findOne({ subject: "physics"})
            const chemistry = await this.findOne({ subject: "chemistry"})
            maths.totalSeats = total.maths
            physics.totalSeats = total.physics
            chemistry.totalSeats = total.chemistry
            await maths.save()
            await physics.save()
            await chemistry.save()
    } catch (error) {
        console.log(error)
    }
}

const Classes = mongoose.model('CLASS', classSchema)
module.exports = Classes