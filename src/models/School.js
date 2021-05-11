import mongoose from "mongoose"

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    // @todo remember to add the courses schema and model
    // courses: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // ]
})

const School = mongoose.model('school', schoolSchema)

export default School