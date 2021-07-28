import express from "express"
import { body, validationResult } from "express-validator"
import auth from "../middleware/auth"
import Course from "../models/Course"
import CourseChapter from "../models/CourseChapter"

const router = express.Router()

// private route to create a new course module or chapter
// create new course module or chapter sends
// newly created coursechapter/module populated with course unit
router.post('/:courseId', [
    auth,
    body('name', 'module name cannot be empty').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const courseId = req.params.courseId
        const validCourse = await Course.findOne({ _id: courseId })
        if(!validCourse){
            return res.status(400).json({
                errors: [{
                    msg: "course not found"
                }]
            })
        }
        const newCourseChapterObject = new CourseChapter({
            name: req.body.name,
            course: courseId
        })
    
        newCourseChapterObject.save(function(err, book){
           CourseChapter.populate(book, { path: 'courseunit'})
           .then(function(book){
               res.json(book)
           })
        })
       
    } catch (error) {
        console.error(error)
    }
})

router.get('/:courseId', async (req, res) => {
   try {
    const courseId = req.params.courseId
    const courseChapters = await CourseChapter.find({
        course: courseId
    }).populate('courseunit')
    res.json(courseChapters)
   } catch (error) {
       console.error(error)
   }
})
export default router