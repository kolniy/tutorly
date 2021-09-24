import express from 'express'
import School from '../models/School'
import AvailablePaymentMethod from '../models/AvailablePaymentMethod'
import SchoolPaymentMethod from '../models/SchoolPaymentMethod'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/:paymentmethodId/:schoolId', auth, async (req, res) => {
    const paymenMethodId = req.params.paymentmethodId
    const schoolId = req.params.schoolId
    try {
        const validPaymentMethod = await AvailablePaymentMethod.findOne({
            _id: paymenMethodId
        })
        if(!validPaymentMethod){
            return res.status(400).json({
                errors: [{msg:"invalid payment method"}]
            })
        }
    
        const validSchool = await School.findOne({
            _id: schoolId
        })
    
        if(!validSchool){
            return res.status(400).json({
                errors: [{msg:"school not found"}]
            })
        }
    
        const newSchoolPaymentMethod = new SchoolPaymentMethod({
            name: validPaymentMethod.name,
            logourl: validPaymentMethod.logourl,
            publickey:'',
            privatekey:'',
            school: validSchool._id,
            paymentmethodId: validPaymentMethod._id
        })
    
        await newSchoolPaymentMethod.save()
        res.json(newSchoolPaymentMethod)
    } catch (error) {
        res.status(500).send('server error')
    }
})

router.get('/:schoolId', async (req, res) => {
    const schoolId = req.params.schoolId
    try {
        const schoolPaymentMethods = await SchoolPaymentMethod.find({
            school: schoolId
        })
        res.json(schoolPaymentMethods)
    } catch (error) {
        res.status(500).send('server error')
    }
})

router.put('/check/:paymentmethodId', auth, async (req, res) => {
    const paymentMethodId = req.params.paymentmethodId
    try {
        const validPaymentMethod = await SchoolPaymentMethod.findOne({
            _id: paymentMethodId
        })
        if(!validPaymentMethod){
            return res.status(400).json({
                errors: [{msg: 'payment method not found'}]
            })
        }
        validPaymentMethod.active = (!validPaymentMethod.active)
        await validPaymentMethod.save()
        res.json(validPaymentMethod)
    } catch (error) {
        res.status(500).send('server error')
    }
})  

router.put('/keys/:paymentmethodId', auth, async (req, res) => {
    const paymentMethodId = req.params.paymentmethodId
    try {
        const validPaymentMethod = await SchoolPaymentMethod.findOne({
            _id: paymentMethodId
        })
        if(!validPaymentMethod){
            return res.status(400).json({
                errors: [{msg: 'payment method not found'}]
            })
        }
        const { privatekey, publickey } = req.body
        validPaymentMethod.privatekey = privatekey
        validPaymentMethod.publickey = publickey
        
        await validPaymentMethod.save()
        res.json(validPaymentMethod)
    } catch (error) {
        res.status(500).send('server error')
    }
})

export default router