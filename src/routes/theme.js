import express from "express"
import { body, validationResult } from "express-validator"
import Theme from "../models/Theme"

const router = express.Router()

// route to create new theme
router.post('/', [
    body("name", "theme name is required").not().isEmpty(),
    body("imagepreview", "Theme image preview is required").not().isEmpty()
] ,async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, imagepreview } = req.body
    try {
        const newTheme = new Theme({
            name,
            imagepreview
        })
        await newTheme.save()
        res.json(newTheme)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
        console.error(error)
    }
})

export default router