import mongoose from "mongoose"

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school'
    },
    logo: {
        type: String
    },
    themeimage:{
        type: String
    },
    themeschoolname: {
        type: String
    },
    themetitle: {
        type: String
    },
    themesubtitle: {
        type: String
    },
    facebookurl: {
        type: String
    },
    instagramurl: {
        type: String
    },
    twitterurl: {
        type: String
    },
    googleurl: {
        type: String
    },
    youtubeurl: {
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
    phonenumber: {
        type: String
    },
    countryphonecode: {
        type: String
    }
})

const Theme = mongoose.model('theme', themeSchema)

export default Theme