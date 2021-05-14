import path from "path"
import express from "express"
import connectDB from "./config/connection"

import userRoute from "./routes/user"
import schoolRoute from "./routes/school"

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

// block of code come's after application routes
if(process.env.NODE_ENV === 'production'){
    // set static files
    app.use(express.static('client/build'))

    
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => console.log(`App is Listenng on port ${PORT}`))