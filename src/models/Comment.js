import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    courseunit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseunit',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'reply'
        }
    ]
},{
    timestamps: true
})

commentSchema.plugin(mongoosePaginate)

const Comment = mongoose.model('comment', commentSchema)

export default Comment