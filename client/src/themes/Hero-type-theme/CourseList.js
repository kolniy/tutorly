import React from 'react'
import { Container, Row } from "reactstrap"
import CourseItem from "./CourseItem"

export const CourseList = ({ themeData }) => {
    return <>
        <section className="course-list">
            <Container fluid className="course-list-container">
                <h3 className="section-title">{themeData.themeschoolname} Course List</h3>
                <div className="course-item-container">
                    <Row>
                        <CourseItem courseName="Journey into the wood" />
                        <CourseItem courseName="Expert Wood Work" />
                        <CourseItem courseName="Wood sensei" />
                        <CourseItem courseName="wood work masterclass summary" />
                    </Row>
                </div>
            <hr className="course-list-hr" />
            </Container>
        </section>
    </>
}

export default CourseList