import mongoose from "mongoose";

const schoolPaymentMethodSchema = new mongoose.Schema({
    name: {
        type: String
    },
    logourl: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    publickey: {
        type: String,
    },
    privatekey: {
        type: String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    },
    paymentmethodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'availablepaymentmethod'
    }
})

const SchoolPaymentMethod = mongoose.model('schoolpaymentmethod', schoolPaymentMethodSchema)

export default SchoolPaymentMethod