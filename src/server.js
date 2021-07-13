import path from "path"
import express from "express"
import connectDB from "./config/connection"
import cloudinary from "cloudinary"

import userRoute from "./routes/user"
import schoolRoute from "./routes/school"
import courseTypeRoute from "./routes/coursetype"
import CourseRoute from "./routes/course"
import courseUnitRoute from "./routes/courseunit"
import messageRoute from "./routes/message"
import themeRoute from "./routes/theme"
import themePreviewRoute from "./routes/themepreview"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: false }))

connectDB()

app.get('/', (req, res) => {
  res.send("welcome to our api")
})

// all application routes will accessed from here
app.use('/api/v1/user', userRoute)
app.use('/api/v1/school', schoolRoute)
app.use('/api/v1/coursetype', courseTypeRoute)
app.use('/api/v1/course', CourseRoute)
app.use('/api/v1/courseunit', courseUnitRoute)
app.use('/api/v1/message', messageRoute)
app.use('/api/v1/theme', themeRoute)
app.use('/api/v1/themepreview', themePreviewRoute)

// block of code come's after application routes
if(process.env.NODE_ENV === 'production'){
    // set static files
    app.use(express.static('client/build'))

    
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => console.log(`App is Listenng on port ${PORT}`))