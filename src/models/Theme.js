import mongoose from "mongoose"

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    imagepreview: {
        type: String
    }
})

const Theme = mongoose.model('theme', themeSchema)

export default Theme