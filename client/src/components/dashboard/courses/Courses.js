import React from 'react'
import { 
    Row,
    Col,
    Container
} from "reactstrap"
import DashboardNavbar from "../DashboardNavbar"
import CoursesContainer from "./CoursesContainer"

import "../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../custom-styles/dashboard/courses.css"

const Courses = () => {
    return <>
        <div className="dashboard-layout">
            <Container fluid>
                <Row>
                   <DashboardNavbar />
                    <Col>
                       <div className="page-actions">
                           <div className="courses-page">
                               <div className="courses-page__contents">
                                   <h3 className="page-title">
                                       My Courses
                                   </h3>
                                    <CoursesContainer />
                               </div>
                           </div>
                       </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

export default Courses