import express from "express"
import auth from "../middleware/auth"
import School from "../models/School"

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

export default router