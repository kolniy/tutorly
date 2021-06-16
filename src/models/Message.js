import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    text: {
        type: String,
        required: true  
    },
    readstatus: {
        type: Boolean,
        default: false 
    }
})

const Message = mongoose.model('message', messageSchema)

export default Message