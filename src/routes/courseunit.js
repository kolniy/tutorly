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

const createCourseUnitVideoUpload = multer({
    storage: storageDest,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(mp4|mov)$/)){
            return cb(new Error('Please Upload another video'))
         }
         cb(undefined, true)
    }
})

// const videoUpload = upload.single('videofile')
router.post('/:courseId/:moduleId', auth, 
  [
    body('name', 'name can not be empty').not().isEmpty(),
    body('videofile', 'video file can not be empty').not().isEmpty(),
  ],
  createCourseUnitVideoUpload.single('videofile'),
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

        if(!req.file){
            return res.status(400).json({
                errors: [{ msg: "invalid file type"}]
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

// update course unit name
router.put('/:courseUnitId', auth, [
    body('name', 'unit name cannot be empty').not().isEmpty()
], async (req, res) => {
    const courseUnitId = req.params.courseUnitId
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { name } = req.body
    try {
        let courseUnit = await CourseUnit.findOne({
            _id: courseUnitId
        })
        if(!courseUnit){
            return res.status(400).json({
                errors: [{msg: "course unit not found"}]
            })
        }
        courseUnit.name = name
        await courseUnit.save()
        res.json(courseUnit)
    } catch (error) {
       console.error(error)
    }
})

const attachmentUplaod = multer({
    storage: storageDest,
})

// route to add courseunit attachment
router.put('/attachment/:courseUnitId', auth,
attachmentUplaod.single('attachment'),
 async (req, res) => {
    const courseUnitId = req.params.courseUnitId
    try {
        let courseUnit = await CourseUnit.findOne({
            _id: courseUnitId
        })
        if(!courseUnit){
            return res.status(400).json({
                errors: [{msg: "course unit not found"}]
            })
        }

        if(!req.file){
            return res.status(400).json({
                errors: [{ msg: "invalid file type"}]
            })
        }

        const fileType = `.${req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]}`

        const attachmentToBeUploaded = dataUri(`${fileType}`, req.file.buffer).content

        let uploadResponse = await cloudinary.v2.uploader.upload(attachmentToBeUploaded, {
             resource_type: "auto",
             folder: `tuturly/course/attachment`
        })

        const attachment = {
            url: uploadResponse.url,
            attachmentId: uploadResponse.public_id
        }

        courseUnit.attachment.push(attachment)
        await courseUnit.save()
        res.json(courseUnit)

    } catch (error) {
       console.error(error)
       if(error.message === 'Request Timeout'){
           return res.status(500).json({
               msg: 'resource cannot be uploaded at the moment'
           })
       }
       res.status(500).send("server")
    }
})

const videoUpdateUpload = multer({
    storage: storageDest,
})

router.put('/attachment/remove/:courseUnitId/:attachmentId', auth, async (req, res) => {

    const courseUnitId = req.params.courseUnitId
    const attachmentId = req.params.attachmentId

    try {
        let courseUnit = await CourseUnit.findOne({
            _id: courseUnitId
        })
        if(!courseUnit){
            return res.status(400).json({
                errors: [{msg: "course unit not found"}]
            })
        }

        const attachmentToBeDeleted = courseUnit.attachment.find((attachment) => attachment._id == attachmentId)
        if(attachmentToBeDeleted){
            const attachmentPublicId = attachmentToBeDeleted.attachmentId.split('/')[attachmentToBeDeleted.attachmentId.split('/').length - 1]

            // remove attachment from cloud server
            await cloudinary.v2.uploader.destroy(attachmentPublicId, {
                resource_type: 'raw'
            })
        }

        courseUnit.attachment = courseUnit.attachment.filter((attachment) => attachment._id != attachmentId)
        await courseUnit.save()
        res.json(courseUnit)
    } catch (error) {
     console.error(error)
     res.status(500).send("server")
    }
})

// route to update courseUnit video url
router.put('/video/:courseId/:courseUnitId', auth,
videoUpdateUpload.single('videofile'),
async (req, res) => {

    const courseId = req.params.courseId
    const courseUnitId = req.params.courseUnitId

    try {

        const course = await Course.findOne({
            _id: courseId
        })

        if(!course){
            return res.status(400).json({
                errors: [{msg: "course not valid"}]
            })
        }

        let courseUnit = await CourseUnit.findOne({
            _id: courseUnitId
        })
        if(!courseUnit){
            return res.status(400).json({
                errors: [{msg: "course unit not found"}]
            })
        }

        if(!req.file){
            return res.status(400).json({
                errors: [{ msg: "invalid file type"}]
            })
        }

        const fileType = `.${req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]}`
        const publicVideoIdOfUpdatedVideo = courseUnit.videopublicid
        const videoToBeUploaded = dataUri(`${fileType}`, req.file.buffer).content

        const previousVideoId = publicVideoIdOfUpdatedVideo.split('/')[publicVideoIdOfUpdatedVideo.split('/').length - 1]

        let uploadResponse = await cloudinary.v2.uploader.upload(videoToBeUploaded, {
             resource_type: "video",
             folder: `tuturly/course/video/${course.title}`
        })

        courseUnit.videourl = uploadResponse.url
        courseUnit.videopublicid = uploadResponse.public_id
        courseUnit.videothumbnail = uploadResponse.url.replace('.mp4', '.png')

        await cloudinary.v2.uploader.destroy(previousVideoId, {
            resource_type: 'video'
        })

        await courseUnit.save()
        res.json(courseUnit)

    } catch (error) {
       console.error(error)
       res.status(500).send("server")
    }
})

// private route to delete course unit
router.delete('/:courseUintId', auth, async (req, res) => {
    const courseUnitId = req.params.courseUintId

    try {
        const courseUnit = await CourseUnit.findOne({
            _id: courseUnitId
        })
        if(!courseUnit){
            return res.status(400).json({
                errors: [{msg: "courseunit not found"}]
            })
        }
        const videoPublicId = courseUnit.videopublicid.split('/')[courseUnit.videopublicid.split('/').length - 1]
        await cloudinary.v2.uploader.destroy(videoPublicId, {
            resource_type: 'video'
        })
        await courseUnit.remove()
        res.json(courseUnit)
    } catch (error) {
        console.error(error)
       res.status(500).send("server")
    }
})

export default router