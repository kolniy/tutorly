import React from 'react'
import { Col } from "reactstrap"
import { Link } from "react-router-dom"

export const CourseItem = ({ courseName }) => {
    return <>
        <Col xs="12" sm="6" md="4" xl="3">
          <div className="course-item">
            <div className="course-item-previewer"></div>
            <p className="course-item-name">
                <Link>{ courseName }</Link>
            </p>
          </div>
        </Col>
    </>
}

export default CourseItem
