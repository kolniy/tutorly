import mongoose from "mongoose"

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    themename: {
        type: String
    },
    themeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"theme"
    },
    testimonials: [
        {
            testifiedby: {
                type: String
            },
            testifiertext: {
                type: String
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course"
        }
    ]
})

const School = mongoose.model('school', schoolSchema)

export default School