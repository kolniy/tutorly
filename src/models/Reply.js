import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const replySchema = new mongoose.Schema({
    username: {
        type: String
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

replySchema.plugin(mongoosePaginate)

const Reply = mongoose.model('reply', replySchema)

export default Reply