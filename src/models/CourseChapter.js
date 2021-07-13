import mongoose from "mongoose"

const courseChapterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    courseunit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseunit"
    }]
})

const CourseChapter = mongoose.model("coursechapter", courseChapterSchema)

export default CourseChapter