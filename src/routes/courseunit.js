import express from "express"
import cloudinary from "cloudinary"
import { body, validationResult } from "express-validator"
import multer, { memoryStorage } from "multer"
import Course from "../models/Course"
import CourseChapter from "../models/CourseChapter"
import CourseUnit from "../models/CourseUnit"
import auth from "../middleware/auth"
import dataUri from "../utilities/dataUri"

const router = express.Router()

const storageDest = memoryStorage()

const upload = multer({
    storage: storageDest,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(mp4|mov)$/)){
            return cb(new Error('Please Upload another video'))
         }
         cb(undefined, true)
    }
})

// const videoUpload = upload.single('videofile')

router.post('/:courseId/:moduleId', [
    auth,
    body('name', 'name can not be empty').not().isEmpty(),
    body('videofile', 'video file can not be empty').not().isEmpty(),
],
upload.single('videofile'),
async (req, res) => {

    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const fileType = `.${req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]}`

    const courseId = req.params.courseId
    const moduleId = req.params.moduleId

    const { name } = req.body
    try {
        // check and validate course from course id that is valid
        const course = await Course.findOne({
            _id: courseId
        })

        if(!course){
            return res.status(400).json({
                errors: [{msg: "course not valid"}]
            })
        }

        let courseModule = await CourseChapter.findOne({
            _id: moduleId
        })

        if(!courseModule){
            return res.status(400).json({
                errors: [{ msg: "module not valid"}]
            })
        } 

        const videoToBeUploaded = dataUri(fileType, req.file.buffer).content

        let uploadResponse = await cloudinary.v2.uploader.upload(videoToBeUploaded, {
            resource_type: "video",
             folder: `tuturly/course/video/${course.title}`
        })

        const courseUnitObj = new CourseUnit({
            name,
            videourl: uploadResponse.url,
            videopublicid: uploadResponse.public_id,
            videothumbnail: uploadResponse.url.replace('.mp4', '.png'),
            course: courseId,
            coursechapter: moduleId
        })

        await courseUnitObj.save()

        // update courseChapter/module to save the id of the newly created 
        // course unit
        courseModule.courseunit.push(courseUnitObj._id)
        await courseModule.save()

        // query to get all the course modules including module with the 
        // new added course unit
        const modulesWithUpdatedCourseUnit = await CourseChapter.find({
            course: courseId
        }).populate('courseunit')
        res.json(modulesWithUpdatedCourseUnit)
    } catch (error) {
       console.error(error)
    }
})

router.get('/:courseUnitId', auth, async (req, res) => {
    const courseUnitId = req.params.courseUnitId
    try {
        const courseUnit = await CourseUnit.findOne({
            _id: courseUnitId
        })
        if(!courseUnit){
            return res.status(400).json({
                errors: [{ msg: "course unit not found"}]
            })
        }
        res.json(courseUnit)
    } catch (error) {
       console.error(error)
    }
})

export default router