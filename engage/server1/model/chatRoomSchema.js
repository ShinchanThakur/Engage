const mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    chats: [
        {
            author: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }
    ]
})

/////////////////////////////////////////////////////////////////////////////////////////

chatRoomSchema.methods.addChat = async function(chat) {
    try {
            this.chats = this.chats.concat(chat)
            await this.save()
    } catch (error) {
        console.log(error)
    }
}

chatRoomSchema.methods.getChats = function() {
    try {
        console.log('getChats called')
        return this.chats
    } catch (error) {
        console.log(error)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

const ChatRooms = mongoose.model('CHATROOMS', chatRoomSchema)
module.exports = ChatRooms