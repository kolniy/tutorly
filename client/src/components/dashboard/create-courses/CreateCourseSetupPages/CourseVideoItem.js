import React from 'react'
import { Link } from 'react-router-dom'

export const CourseVideoItem = ({ courseUnit }) => {
    return <>
        <div className="course-video-item">
            <div className="course-video-item__img-container">
                <img src={courseUnit.videothumbnail} alt="" className="img-fluid"/>
            </div>
            <p className="course-video-item__name ml-4">
                <Link to={`/dashboard/course/module/vidoepreview/${courseUnit._id}`}>{courseUnit.name}</Link>
            </p>
            <i className="fas fa-trash-alt"></i>
        </div>
    </>
}
export default CourseVideoItem