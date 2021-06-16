import mongoose from "mongoose"

const courseMediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    mediatype: {
        type: String
    },
    mediaurl: {
        type: String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true  
    }
})

const CourseMedia = mongoose.model('coursemedia', courseMediaSchema)

export default CourseMedia