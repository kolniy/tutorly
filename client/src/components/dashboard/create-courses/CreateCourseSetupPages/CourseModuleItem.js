import React from 'react'

export const CourseModuleItem = ({ module }) => {
    return <>
        <div className="course-module__item">
            <h4>
                {module.name}
            </h4>
            <hr className="moduleItem__hr" />
            <i class="fas fa-file-video"></i>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt"></i>
        </div>
    </>
}

export default CourseModuleItem
