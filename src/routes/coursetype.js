import express from "express"
import { body, validationResult } from "express-validator"
import CourseType from "../models/CourseType"

const router = express.Router()

// route to get courses
router.get('/coursetitle', async (req, res) => {
    try {
        const suggest = req.query.data
        const regex = new RegExp(suggest, 'i') // i for case insensitive search
        const results = await CourseType.find({
            title: {
                $regex: regex
            }
        })
        res.json(results)
    } catch (error) {
        res.status(500).send("Server Error")
        console.error(error)
    }
})

// route to create new courses
router.post('/coursetitle',
    [
      // @ todo add middleware for only admin access
      body('title', 'course type title must be provided').not().isEmpty()
    ],
 async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { title } = req.body
    try { 
        const newCourseType = new CourseType({
            title
        })
        await newCourseType.save()
        res.json(newCourseType)
    } catch (error) {
        res.status(500).send("Server Error")
        console.error(error)
    }
})

export default router