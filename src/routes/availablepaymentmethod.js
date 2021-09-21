import express from "express";
import AvailablePaymentMethod from "../models/AvailablePaymentMethod";
import { body, validationResult } from "express-validator";
import auth from "../middleware/auth";

const router = express.Router()

router.post('/', auth, [
    body('name', 'name is required').not().isEmpty(),
    body('logourl', 'logourl is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const { name, logourl } = req.body

        const newPaymentMethod = AvailablePaymentMethod({
            name,
            logourl
        })
    
        await newPaymentMethod.save()
        res.json(newPaymentMethod)
    } catch (error) {
        res.status(500).send('server error')
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const paymentMethods = await AvailablePaymentMethod.find()
        res.json(paymentMethods)
    } catch (error) {
        res.status(500).send('server error')
    }
})

export default router