import mongoose from "mongoose"

const courseTypeSchema = new mongoose.Schema({
    title: {
        type: String
    }
})

const CourseType = mongoose.model('courseType', courseTypeSchema)

export default CourseType