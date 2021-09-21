import mongoose from "mongoose";

const availablePaymentMethodSchema = new mongoose.Schema({
    name: {
        type: String
    },
    logourl: {
        type: String
    }
})

const AvailablePaymentMethod = mongoose.model('availablepaymentmethod', availablePaymentMethodSchema)

export default AvailablePaymentMethod