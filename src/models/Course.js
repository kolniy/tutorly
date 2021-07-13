import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    category: {
        type: String
    },
    prerequisite: {
        type: String
    },
    language: {
        type: String
    },  
    level: {
        type: String
    },
    description: {
       type: String
    },
    thumbnail: {
        type: String
    },
    price: {
        type: Number
    },
    published: {
        type: Boolean,
        default: false  
    },
    reviews: [{
        name: {
            type: String
        },
        email: { // email added to keep track of user's who have already added reviews.
            //  even though it won't be displayed
            type: String,   
        },
        star: {
            type: Number,
            default: 0
        },
        comment: {
            type: String
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
    coursechapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "coursechapter"
    }]
}, {
    timestamps: true
})

const Course = mongoose.model('course', courseSchema)

export default Course