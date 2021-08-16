import mongoose from "mongoose"

const courseUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    videourl : {
        type: String,
        required: true
    },
    videothumbnail: {
        type: String
    },
    videopublicid: {
        type: String,
        required: true
    },
    attachment: [{
        url: {
            type: String
        },
        attachmentId: {
            type: String
        }
    }],
    comments: [
       {
        user: {
            type: mongoose.Schema.Types.ObjectId, 
        },
        text: {
            type: String
        },
        name: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        replies: [
            {
                name: {
                    type: String
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId
                },
                text: {
                    type: String
                }
            }
        ]
       }
    ],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true  
    },
    coursechapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coursechapter",
        required: true
    }
})

const CourseUnit = mongoose.model('courseunit', courseUnitSchema)

export default CourseUnit