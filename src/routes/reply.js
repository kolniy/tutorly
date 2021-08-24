import express from "express"
import { body, validationResult } from "express-validator"
import User from "../models/User"
import Comment from "../models/Comment"
import Reply from "../models/Reply"
import auth from "../middleware/auth"

const router = express.Router()

router.post('/:commentId', auth, 
body('text', 'reply text required').not().isEmpty(),
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { text } = req.body

    try {
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

        const user = await User.findOne({
            _id: req.user.id
        })

        const reply = new Reply({
            username: user.username,
            text: text,
            comment: comment._id
        })

        comment.reply.push(reply._id)

        await reply.save()
        await comment.save()

        res.json(reply)
    } catch (error) {
     console.error(error)
     res.status(500).send("server error")
    }
})

router.get('/:commentId', auth, async (req, res) => {

    const { page, size } = req.query

    const limit = parseInt(size)
    const skip = parseInt(page - 1) * size

    try {
        const comment = await Comment.findOne({
            _id: req.params.commentId
        })
        
        if(!comment){
            return res.status(400).json({
                errors: [{
                    msg: 'comment not found'
                }]
            })
        }

        const replies = await Reply.paginate({
            comment: comment._id
        }, {
            offset:skip,
            limit:limit
        })
        res.json(replies)
    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
})

export default router