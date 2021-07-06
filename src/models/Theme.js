import mongoose from "mongoose"

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    schoolID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school'
    },
    logo: {
        type: String
    },
    heroimage:{
        type: String
    },
    herotitle: {
        type: String
    },
    herosubtitle: {
        type: String
    },
    facebooklink: {
        type: String
    },
    instagramlink: {
        type: String
    },
    twitterlink: {
        type: String
    },
    googlelink: {
        type: String
    },
    youtubelink: {
        type: String
    },
    instructorimage: {
        type: String
    },
    abouttext: {
        type: String
    },
    contactaddress: {
        type: String
    },
    contactcountry: {
        type: String
    },
    phonenumber: {
        type: String
    }
})

const Theme = mongoose.model('theme', themeSchema)

export default Theme