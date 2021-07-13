import express from "express"
import { body, validationResult } from "express-validator"
import Course from "../models/Course"
import School from "../models/School"
import User from "../models/User"
import auth from "../middleware/auth"

const router = express.Router()

router.post('/:schoolId', [
    auth,
    body("title", "title is required").not().isEmpty(),
    body("subtitle", "subtitle is required").not().isEmpty(),
    body("category", "category is required").not().isEmpty(),
    body("description", "description is required").not().isEmpty(),
    body("prerequisite", "prerequisites is required").not().isEmpty(),
    body("language", "language is required").not().isEmpty(),
    body("level", "level is required").not().isEmpty(),
    body("thumbnail", "thumbnail is required").not().isEmpty(),
    body("price", "price is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const schoolId = req.params.schoolId
    const userId = req.user.id

    const { title, subtitle, category,
         description, prerequisite,
          language, level, thumbnail, price  } = req.body
    try {
        let school = await School.findOne({
            _id: schoolId
        })
        if(!school){
            return res.status(400).json({
                errors: [{ msg: "school not found" }]
            })
        }
    
        let course = new Course({
            title,
            subtitle,
            category,
            description,
            prerequisite,
            language,
            level,
            thumbnail,
            price,
            author: userId,
            school: schoolId
        })

        await course.save()
        res.json(course)
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

// route to get specific course by courseId
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.courseId })
        if(!course){
            return res.status(400).json({
                errors: [{ msg: "course not found"}]
            })
        }
        res.json(course)
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

// route to get all courses by school 
router.get('/school/:schoolId', auth, async (req, res) => {
    try {
    const courses = await Course.find({
        school: req.params.schoolId
    })
    res.json(courses)
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

// route to get all courses by author
router.get('/author/:authorId', auth, async (req, res) => {
    try {
        const courses = await Course.find({
            author: req.params.authorId
        })
        res.json(courses)
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

// route to update course by id
router.put('/:courseId', auth, async (req, res) => {
    const courseId = req.params.courseId
    try {
        let course = await Course.findOne({ _id: courseId })
        if(!course){
            return res.status(404).json({
                errors: [{ msg: "course not found"}]
            })
        }
        const { 
            title,
            subtitle,
            category,
            description,
            prerequisite,
            language,
            level,
            thumbnail,
            price } = req.body

           if(title)  course.title = title
           if(subtitle) course.subtitle = subtitle
           if(category) course.category = category
           if(description) course.description = description
           if(prerequisite) course.prerequisite = prerequisite
           if(language) course.language = language
           if(level) course.level = level
           if(thumbnail) course.thumbnail = thumbnail
           if(price) course.price = price

           await course.save()
           res.json(course)

    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

router.put('/review/:courseId', auth, [
    body("comment", "comment is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const courseId = req.params.courseId
    const { comment, star } = req.body
    try {
        let course = await Course.findOne({ _id: courseId })

        if(!course){
            return res.status(400).json({
                errors: [{
                    msg: "invalid course"
                }]
            })
        }

        const user = await User.findOne({ _id: req.user.id })
        let userReview = {
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            comment,
            date: Date.now()
        }

        if(star) userReview.star = star

        if(course.reviews.filter((review) => review.email.toString().toLowerCase() === user.email.toLowerCase()).length > 0){
            return res.status(400).json({
                errors: [{
                    msg: "user review already exists"
                }]
            })
        }

        course.reviews.unshift(userReview)
        await course.save()
        res.json(course)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// route to remove review from course 
router.put('/review/:courseId/:reviewId', auth, async (req, res) => {
    try {
        let course = await Course.findOne({ _id: req.params.courseId })

        if(!course){
            return res.status(400).json({
                errors: [{
                    msg: "invalid course"
                }]
            })
        }

        course.reviews = course.reviews.filter((review) => review._id === req.params.reviewId)

        await course.save()
        res.json(course)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// route to delete course by ID
router.delete('/:courseId', auth, async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.courseId })
        if(!course){
            return res.status(400).json({
                errors: [{ msg: "course not found"}]
            })
        }
        await course.remove()
        res.json(course)
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

export default router