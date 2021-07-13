import mongoose from "mongoose"

const courseUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    mediaurl: {
        type: String
    },
    hasattachments: {
        type: Boolean
    },
    attachmenturl: [{
        type: String
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true  
    },
    coursechapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coursechapter",
        required: true
    }
})

const CourseUnit = mongoose.model('courseunit', courseUnitSchema)

export default CourseUnit