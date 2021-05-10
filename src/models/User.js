import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String
    },
    createdVia: {
        type: String
    },
    deviceCreatedWith: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    field: {
        type: String
    },
    about: {
        type: String
    },
    setupComplete: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', userSchema)

export default User