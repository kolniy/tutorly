import React from 'react'

export const CourseVideoItem = ({ courseUnit }) => {
    return <>
        <div className="course-video-item">
            <div className="course-video-item__img-container">
                <img src={courseUnit.videothumbnail} alt="" className="img-fluid"/>
            </div>
            <p className="course-video-item__name ml-4">{courseUnit.name}</p>
            <i className="fas fa-eye"></i>
            <i className="fas fa-edit"></i>
            <i className="fas fa-trash-alt"></i>
        </div>
    </>
}

export default CourseVideoItem