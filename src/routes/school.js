import express from "express"
import auth from "../middleware/auth"
import School from "../models/School"
import Theme from "../models/Theme"
import Course from "../models/Course"
import CourseChapter from "../models/CourseChapter"

const router = express.Router()

// private route to get school by logged in user
router.get('/', auth, async (req, res) => {
    try {
        const school = await School.findOne({
            createdBy: req.user.id
        })

        if(!school){
            return res.status(400).json({
                errors: [{msg: "school not found"}]
            })
        }
        res.json(school)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})

router.get('/:schoolname', async (req, res) => {
    const schoolname = req.params.schoolname
    try {
        const school = await School.findOne({
            name: schoolname
        })
        if(!school){
            return res.status(404).json({errors : [{
                msg: "school not found"
            }]})
        }

        const theme = await Theme.findOne({
            schoolId: school._id
        })

        res.json({
            school,
            theme
        })
    } catch (error) {
        res.status(500).send("server error")
    }
})

// route to get school courses by school name
router.get('/courses/:schoolname', async (req, res) => {    
    const schoolname = req.params.schoolname
    try {
        const school = await School.findOne({
            name: schoolname
        })
        if(!school){
            return res.status(404).json({errors : [{
                msg: "school not found"
            }]})
        }
        const courses = await Course.find({
            school: school._id
        }).populate('author')
        res.json(courses)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
})

// private route to update school theme
router.put('/theme/:id', auth, async (req, res) => {
    try {

        const themeid = req.params.id

        let school = await School.findOne({
            createdBy: req.user.id
        })

        let theme = await Theme.findOne({ _id: themeid })
    
        if(!school){
            return res.status(400).json({
                errors: [{msg: "school not found"}]
            })
        }

        school.themename = theme.name
        school.themeid = theme._id
        
        await school.save()

        res.json(school)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})

// route to get specific course by courseaName
// schoolname is searched to ensure valid school is used
router.get('/:schoolname/:coursetitle', async (req, res) => {
    const schoolName = req.params.schoolname
    const courseTitle = req.params.coursetitle
  
    try {
        const school = await School.findOne({
            name: schoolName
        })
        if(!school){
            return res.status(404).json({errors : [{
                msg: "school not found"
            }]})
        }

        const course = await Course.findOne({
            title: courseTitle
        })

        res.json(course)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})

// route to get course Modules by CourseId
router.get('/course/module/:courseId', async (req, res) => {
    try {
    const courseId = req.params.courseId
    const courseChapters = await CourseChapter.find({
        course: courseId
    }).populate('courseunit')
    res.json(courseChapters)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})

export default router