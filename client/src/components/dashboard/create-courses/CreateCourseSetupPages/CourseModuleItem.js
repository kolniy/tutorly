import React from 'react'

export const CourseModuleItem = ({ module, openVideoModal }) => {
    return <>
        <div className="course-module__item">
            <h4>
                {module.name}
            </h4>
            <hr className="moduleItem__hr" />
            <i onClick={e => openVideoModal(module._id)} class="fas fa-file-video"></i>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt"></i>
        </div>
        {
                module.courseunit.length === 0 ? 
                <div className="no-video-message lead">
                    You have no lessons in this module
                </div> : <></>
        }
    </>
}

export default CourseModuleItem
