import express from "express"
import { body, validationResult } from "express-validator"
import cloudinary from "cloudinary"
import sharp from "sharp"
import multer, { memoryStorage } from "multer"
import auth from "../middleware/auth"
import Theme from "../models/Theme"
import School from "../models/School" 
import Themepreview from "../models/Themepreview"
import dataUri from "../utilities/dataUri"

const router = express.Router()

const defaultHeroThemeImage = "https://res.cloudinary.com/thawebguy/image/upload/v1625221263/tuturly/default%20theme%20assets/hero-image_cgkrdx.png"
const defaultAboutThemeImage = "https://res.cloudinary.com/thawebguy/image/upload/v1625223376/tuturly/default%20theme%20assets/author-image_c4vdrq.png"

// route to get theme by school Id
router.get('/:schoolId', auth, async (req, res) => {
    const schoolId = req.params.schoolId
    try {
        const theme = await Theme.findOne({
            schoolId: schoolId
        })
        res.json(theme)
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

// route to create new theme or update school theme name
router.post('/:schoolId/:themepreviewId', auth, async (req, res) => {
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
            validSchool.themepreviewid = previewThemeInfo._id
            
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

        // save themepreview name in 
        validSchool.themename = previewThemeInfo.type 
        validSchool.themepreviewid = previewThemeInfo._id

        if(previewThemeInfo.requiresassets === true){ // if previewed theme requires default
            // theme assets save the default 
           newThemeObject['themeimage'] = defaultHeroThemeImage
           newThemeObject['instructorimage'] = defaultAboutThemeImage
        }
        const newTheme = new Theme(newThemeObject)

        await newTheme.save()
        await validSchool.save()

        res.json({
            school: validSchool,
            theme: newTheme
        })
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }
})

router.put('/setup/themeinfo/:schoolId', [
    auth,
    body('heading', 'heading can not be empty').not().isEmpty(),
    body('subheading', 'subheading can not be empty').not().isEmpty(),
    body('schoolname', 'schoolname can not be empty').not().isEmpty(),
    body('schoolabout', 'schoolabout cannot be empty').not().isEmpty()
], async (req, res) => {
    const schoolId = req.params.schoolId

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
            schoolId: schoolId
        }, themeUpdates, {
            new: true,
        })  

        res.json(theme)

    } catch (error) {
        res.status(500).send("server error")
    }
})

const storageDest = memoryStorage()

const upload = multer({
    storage: storageDest,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|JPEG)$/)){
            return cb(new Error('Please Upload another image'))
         }
         cb(undefined, true)
    }
})

const bannerUpload = upload.single('banner')

router.put('/setup/assetupload/banner/:schoolId', [
    auth,
    body('banner', "image not found").not().isEmpty()
], async (req, res) => {

    const schoolId = req.params.schoolId

    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    bannerUpload(req, res, (err) => {
        if(err){
            return res.status(400).json({
                errors: [{ msg: "invalid image type" }]
            })
        }
    })

    try {
        let theme = await Theme.findOne({ schoolId: schoolId })
        let school = await School.findOne({ _id: schoolId })

        if(!theme){
            return res.status(404).json({
                errors: [{ msg: "theme not found"}]
            })
        }
        const buffer = await sharp(req.file.buffer)
        .resize({ width:1400, height:500 })
        .png().toBuffer()

        const bannerToBeUploaded = dataUri('.png', buffer).content
        
        let uploadResponse = await cloudinary.v2.uploader.upload(bannerToBeUploaded, {
            folder: `tuturly/schoolId-${school.name}/themeassets`,
            public_id: `${school.name}-banner`
        })

        theme.themeimage = uploadResponse.url
        await theme.save()
        
        res.json(theme)
    } catch (error) {
        console.error(error)
    }
})

const aboutUpload = upload.single('about')

router.put('/setup/assetupload/aboutimage/:schoolId', [
    auth,
    body('instructorimage', "image not found").not().isEmpty()
], async (req, res) => {

    const schoolId = req.params.schoolId

    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    aboutUpload(req, res, (err) => {
        if(err){
            return res.status(400).json({
                errors: [{ msg: "invalid image type" }]
            })
        }
    })

    try {
        let theme = await Theme.findOne({ schoolId: schoolId })
        let school = await School.findOne({ _id: schoolId })

        if(!theme){
            return res.status(404).json({
                errors: [{ msg: "theme not found"}]
            })
        }
        const buffer = await sharp(req.file.buffer)
        .resize({ width:200, height:200 })
        .png().toBuffer()

        const bannerToBeUploaded = dataUri('.png', buffer).content

        let uploadResponse = await cloudinary.v2.uploader.upload(bannerToBeUploaded, {
            folder: `tuturly/schoolId-${school.name}/themeassets`,
            public_id: `${school.name}-about`
        })

        theme.instructorimage = uploadResponse.url
        await theme.save()
        
        res.json(theme)

    } catch (error) {
        console.error(error)
    }
})

router.put('/setup/contactinfo/:schoolId', [
    auth,
    body('address', 'address is required').not().isEmpty(),
    body('phone', 'phone is required').not().isEmpty(),
    body('phonecc', 'phone country code is required').not().isEmpty()
], async (req, res) => {
    const schoolId = req.params.schoolId

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { address, phone, 
        phonecc, googleurl,
        facebookurl, youtubeurl, 
        twitterurl, instagramurl } = req.body
        
        try {
            let theme = await Theme.findOne({
                schoolId
            })

            theme.contactaddress = address
            theme.phonenumber = phone
            theme.countryphonecode = phonecc
          
            if(googleurl) theme.googleurl = googleurl
            if(facebookurl) theme.facebookurl = facebookurl
            if(youtubeurl) theme.youtubeurl = youtubeurl
            if(twitterurl) theme.twitterurl = twitterurl
            if(instagramurl) theme.instagramurl = instagramurl

            await theme.save()
            res.json(theme)
        } catch (error) {
            res.status(500).send("server error")
            console.error(error)
        }
})

export default router