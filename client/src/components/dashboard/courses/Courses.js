import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { 
    Row,
    Col,
    Container
} from "reactstrap"
import axios from 'axios'
import { useAlert } from "react-alert"
import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../../../actions/types"
import setAuthToken from '../../../utilities/setAuthToken'
import DashboardNavbar from "../DashboardNavbar"
import CoursesContainer from "./CoursesContainer"

import "../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../custom-styles/dashboard/courses.css"

const Courses = ({ school, updatePageSelector }) => {

    const [ courses, setCourse ] = useState([])
    const alert = useAlert()
    const [ loading, setLoading ] = useState(true)

    const getSchoolCourses = async () => {
        try {
            if(localStorage.getItem("token")){
                setAuthToken(localStorage.getItem("token"))
            }
            const res = await axios.get(`/api/v1/course/school/${school._id}`)
            setCourse(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert.show(element.msg, {
                        type:"error"
                    })
                });
            }
        }
    }

    useEffect(() => {
        if(school){
            getSchoolCourses()
        }
            // eslint-disable-next-line
    }, [school])

    useEffect(() => {
        updatePageSelector(3)
        // eslint-disable-next-line
    }, [])
   
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
                                   {
                                       loading === false ? <CoursesContainer courses={courses}/> : <p className="text-center lead">Loading</p>
                                   }
                               </div>
                           </div>
                       </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

const mapStateToProps = (state) => ({
    school: state.school.schoolDetails
})

const mapDispatchToProps = (dispatch) => ({
    updatePageSelector: (counter) => dispatch({type: UPDATE_DASHBOARD_PAGE_COUNTER, payload:counter })
})

export default connect(mapStateToProps, mapDispatchToProps)(Courses)