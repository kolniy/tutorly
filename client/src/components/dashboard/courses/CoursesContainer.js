import React from 'react'
import { Row, Col } from "reactstrap"
import CourseItem from "./CourseItem"

export const CoursesContainer = ({ courses }) => {
    return <>
        <div className="courses-container">
           <Row>
               {
                   courses.length === 0 ? 
                   <p className="text-center lead">No Courses Found</p> : <>
                    {
                        courses.map((course) => <CourseItem key={course._id} course={course} />)
                    }
                   </>
               }
            <Col xs="12" sm="6" md="6" xl="3">
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