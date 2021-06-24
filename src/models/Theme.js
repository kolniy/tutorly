import mongoose from "mongoose"

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    imagepreview: {
        type: String
    },
    themeassets: {
        themelogo: {
            type: String
        },
        themefeatureimage:{
            type: String
        },
        themeinstructorimage: {
            type: String
        }
    }
})

const Theme = mongoose.model('theme', themeSchema)

export default Theme