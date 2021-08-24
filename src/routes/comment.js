import express from "express"
import { body, validationResult } from "express-validator"
import User from "../models/User"
import CourseUnit from "../models/CourseUnit"
import Comment from "../models/Comment"
import auth from "../middleware/auth"

const router = express.Router()

router.post('/:courseunitId', auth,
    body('text', 'comment text required').not().isEmpty(),
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { text } = req.body

    try {
        let courseunit = await CourseUnit.findOne({
            _id: req.params.courseunitId
        })
    
        if(!courseunit){
            return res.status(400).json({
                errors: [{
                    msg: "courseunit not found"
                }]
            })
        }
    
        const user = await User.findOne({
            _id: req.user.id
        })
    
        const comment = new Comment({
            username: user.username,
            text: text,
            courseunit: req.params.courseunitId
        })
    
        courseunit.comments.push(comment._id)
    
        await comment.save()
        await courseunit.save()
    
        res.json(comment)
    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
})

router.get('/:courseunitId', auth, async (req, res) => {

    const { page, size } = req.query

    const limit = parseInt(size)
    const skip = parseInt(page - 1) * size

   try {
       const courseunit = await CourseUnit.findOne({
           _id: req.params.courseunitId
       })
       if(!courseunit){
           return res.status(400).json({
               errors: [{
                   msg: 'courseunit not found'
               }]
           })
       }

    //    const comments = await Comment.find({
    //     courseunit: req.params.courseunitId
    //    }).limit(limit).skip(skip)

    const commentDetails = await Comment.paginate({
        courseunit: req.params.courseunitId
    }, {
        offset: skip,
        limit: limit
    })
       res.json(commentDetails)
   } catch (error) {
    console.error(error)
    res.status(500).send("server error")
   }
})

router.put('/:commentId', auth,
body('text', 'comment text required').not().isEmpty(),
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { text } = req.body
    try {
        // const courseunit = await CourseUnit.findOne({
        //     _id: req.params.courseunitId
        // })
    
        // if(!courseunit){
        //     return res.status(400).json({
        //         errors: [{
        //             msg: "courseunit not found"
        //         }]
        //     })
        // }

        let comment = await Comment.findOne({
            _id: req.params.commentId
        })

        if(!comment){
            return res.status(400).json({
                errors: [{
                    msg: "comment not found"
                }]
            })
        }  
        
        comment.text = text
        await comment.save()
        res.json(comment)
    } catch (error) {
    console.error(error)
    res.status(500).send("server error")
    }
})


router.delete('/:commentId', auth, async (req, res) => {
    try {
        // const courseunit = await CourseUnit.findOne({
        //     _id: req.params.courseunitId
        // })
    
        // if(!courseunit){
        //     return res.status(400).json({
        //         errors: [{
        //             msg: "courseunit not found"
        //         }]
        //     })
        // }

        const comment = await Comment.findOne({
            _id: req.params.commentId
        })

        if(!comment){
            return res.status(400).json({
                errors: [{
                    msg: "comment not found"
                }]
            })
        }  

        await comment.remove()
        res.json(comment)
    } catch (error) {
    console.error(error)
    res.status(500).send("server error")
    }
})


export default router