import express from "express"
import { body, validationResult } from "express-validator"
import Themepreview from "../models/Themepreview"

const router = express.Router()

// route to create a new theme previewer
router.post('/', [
    body("type", "type is required").not().isEmpty(),
    body("thumbnail", "thumbnail url is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { type, thumbnail, requiresassets } = req.body
    try {
        const newThemePreviewer = new Themepreview({
            type,
            thumbnail,
            requiresassets
        })
        await newThemePreviewer.save()
        res.json(newThemePreviewer)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
        console.error(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const themepreviewList = await Themepreview.find()
        res.json(themepreviewList)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
        console.error(error)
    }
})

export default router