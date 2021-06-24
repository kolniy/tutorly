import React from 'react'
import { Row, Col } from "reactstrap"
import CourseItem from "./CourseItem"

export const CoursesContainer = () => {
    return <>
        <div className="courses-container">
           <Row>
            <CourseItem />
            <CourseItem />
            <CourseItem />
            <Col xs="12" sm="12" md="4" xl="3">
            <div className="create-course-button shadow">
                <div className="create-course-button-icon">
                <i class="fas fa-plus-circle"></i>
                </div>
                <div className="create-course-text-cta">
                    Create New Course
                </div>
            </div>
            </Col>
           </Row>
        </div>
    </>
}

export default CoursesContainer