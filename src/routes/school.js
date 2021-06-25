import express from "express"
import auth from "../middleware/auth"
import School from "../models/School"
import Theme from "../models/Theme"

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
        res.json(school)
    } catch (error) {
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


export default router