import mongoose from "mongoose"

const themePreviewSchema = mongoose.Schema({
    type: {
        type: String
    },
    thumbnail: {
        type: String
    },
    requiresassets: {
        type: Boolean,
        default: false
    }
})

const Themepreview = new mongoose.model('themepreview', themePreviewSchema)

export default Themepreview