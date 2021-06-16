import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
       type: String
    },
    coverimage: {
        type: String
    },
    price: {
        type: Number
    },
    reviews: [{
        name: {
            type: String
        },
        email: { // email added to keep track of user's who have already added reviews. even though it won't be displayed
            type: String
        },
        star: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "school"
    },
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "coursemedia"
    }]
})

const Course = mongoose.model('course', courseSchema)

export default Course