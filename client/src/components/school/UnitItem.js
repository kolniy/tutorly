import React from 'react'
// import CourseThumbnailPreview from '../../images/course-preview.jpg'

export const UnitItem = ({ unitItem }) => {
    return <>
        <div className="unit-item">
                <img src={unitItem.videothumbnail} 
                  className="img-fluid img-preview"
                 alt="video thumbnail previewer"
                />
            <div className="video-secondary-info">
                <p className="mt-2 ml-2">{unitItem.name}</p>
                 <div className="video-duration">
                     <p className="mr-2">video - 03:24mins</p>
                 </div>   
            </div>
        </div>
    </>
}

export default UnitItem