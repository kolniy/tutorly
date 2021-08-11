import express from "express"
import { body, validationResult } from "express-validator"
import auth from "../middleware/auth"
import Course from "../models/Course"
import CourseChapter from "../models/CourseChapter"
import CourseUnit from "../models/CourseUnit"

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

// route to get modules/course-chapter by courseId
router.get('/:courseId', auth, async (req, res) => {
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

// private route to update module name
router.put('/:moduleId', [
    auth,
    body('name', 'module name is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const moduleId = req.params.moduleId
    const { name } = req.body

    try {
        let courseChapter = await CourseChapter.findOne({
            _id: moduleId
        })
    
        if(!courseChapter){
            return res.status(400).json({
                errros: [{msg: "module not found"}]
            })
        }
     
        courseChapter.name = name
        courseChapter.save(function(err, coursechapter){
            CourseChapter.populate(coursechapter, {
                path: 'courseunit'
            }).then((module) => {
                res.json(module)
            })
        })
    } catch (error) {
       console.error(error)
       res.status(500).send("server error")
    }
})

// private route to delete module and module course units
router.delete('/:moduleId', auth, async (req, res) => {
    try {
        const moduleId = req.params.moduleId
        const module = await CourseChapter.findOne({
            _id: moduleId
        })
        if(!module){
            return res.status(400).json({
                errors: [{ msg: "invalid module"}]
            })
        }

        await CourseUnit.deleteMany({ coursechapter: moduleId })
        await module.remove()
        res.json(module)
    } catch (error) {
    console.error(error)
    res.status(500).send("server error")
    }
})

export default router