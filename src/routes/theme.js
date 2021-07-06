import express from "express"
import { body, validationResult } from "express-validator"
import Theme from "../models/Theme"
import School from "../models/School" 
import Themepreview from "../models/Themepreview"

const router = express.Router()

const defaultHeroThemeImage = "https://res.cloudinary.com/thawebguy/image/upload/v1625221263/tuturly/default%20theme%20assets/hero-image_cgkrdx.png"
const defaultAboutThemeImage = "https://res.cloudinary.com/thawebguy/image/upload/v1625223376/tuturly/default%20theme%20assets/author-image_c4vdrq.png"

// route to create new theme or update school theme name
router.post('/:schoolId/:themepreviewId', async (req, res) => {
    const themepreviewId = req.params.themepreviewId
    const schoolId = req.params.schoolId
    try {
        let validSchool = await School.findOne({
            _id: schoolId
        })
    
        if(!validSchool){
            return res.status(404).json({
                errors: [{ msg: "school not found"}]
            })
        }
    
        // check if school already has a theme 
        let schoolThemeExists = await Theme.findOne({
            schoolId: schoolId
        })

        const previewThemeInfo = await Themepreview.findOne({
            _id: themepreviewId
        })
    
        if(schoolThemeExists){  // school theme exists, update school schoolId on theme
            // and update themename and themeid on school
    
            // update school theme name
            validSchool.themename = previewThemeInfo.type

            // update theme info for school
            schoolThemeExists.name = previewThemeInfo.type

            await validSchool.save()
            await schoolThemeExists.save()

            return res.json({
                school: validSchool,
                theme: schoolThemeExists
            })
        } 

        const newThemeObject = {}
        newThemeObject['name'] = previewThemeInfo.name
        newThemeObject['schoolId'] = validSchool._id

        if(previewThemeInfo.requiresassets === true){ // if previewed theme requires default
            // theme assets save the default 
           newThemeObject['themeimage'] = defaultHeroThemeImage
           newThemeObject['instructorimage'] = defaultAboutThemeImage
        }
        const newTheme = new Theme(newThemeObject)
        await newTheme.save()

        res.json({
            school: validSchool,
            theme: newTheme
        })
    } catch (error) {
        res.status(500).send("server error")
    }
})

router.put('/setup/themeinfo/:themeid', [
    body('heading', 'heading can not be empty').not().isEmpty(),
    body('subheading', 'subheading can not be empty').not().isEmpty(),
    body('schoolname', 'schoolname can not be empty').not().isEmpty(),
    body('schoolabout', 'schoolabout cannot be empty').not().isEmpty()
], async (req, res) => {
    const themeId = req.params.themeid

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { heading, subheading, schoolname, schoolabout } = req.body

    try {
        const themeUpdates = {
            themetitle: heading,
            themesubtitle: subheading,
            themeschoolname: schoolname,
            abouttext: schoolabout
        }
        const theme = await Theme.findOneAndUpdate({
            _id: themeId
        }, themeUpdates, {
            new: true,
        })  

        res.json(theme)

    } catch (error) {
        res.status(500).send("server error")
    }
})

export default router