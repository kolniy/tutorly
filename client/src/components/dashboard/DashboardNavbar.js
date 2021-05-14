import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { 
    Col,
    Nav, 
    NavItem, 
    NavLink,
    PopoverBody,
    UncontrolledPopover
} from "reactstrap"
import { loadUser, logout } from "../../actions/auth"
import { getDefaultSchool } from "../../actions/school"
import DashboardLoadingSkeleton from "./DashboardLoadingSkeleton"
import dummyAvatar from "../../images/dummy-avatar.png"

import "../../custom-styles/dashboard/dashboardlayout.css";

const DashboardNavbar = ({ 
    loGout,
    history,
    school,
    getSchool,
    getLoggedInUser,
    user
    }) => {

    const handleLogout = (e) => {
        e.preventDefault()
        loGout(history)
    }

    useEffect(() => {
        getSchool()
        getLoggedInUser()
    }, [getSchool, getLoggedInUser])

    return <> 
            {
                school.loading !== true && 
                school.schoolDetails !== null &&
                user !== null
                ? <>
                     <Col sm="2" md="2" xs="2" xl="2">
                        <div className="vertical-navbar">
                            <div className="tutorly-logo">
                                TUTORLY
                            </div>
                            <div className="logged-in-user__info">
                                <div className="logged-in-user__image">
                                    <img src={dummyAvatar} 
                                    alt="user avatar"
                                    className="img-fluid"
                                 />
                                </div>
                            </div>
                            <p className="logged-in-user__school-name d-none-sm">{school.schoolDetails.name}</p>
                            <p className="logged-in-user__email d-none-sm">{user.email}</p>
                            <div className="action-links">
                                <Nav vertical>
                                <NavItem>
                                        <NavLink tag={Link} to="/dashboard/createcourse">
                                        <i className="fas fa-plus"></i> <span className="navlink-text d-none-sm">Create New Course</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/dashboard/courses">
                                        <i className="fas fa-book"></i> <span className="navlink-text d-none-sm">My Courses</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/dashboard/customize">
                                        <i className="fas fa-edit"></i> <span className="navlink-text d-none-sm">Customize space</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/dashboard/sales">
                                        <i className="fas fa-dollar-sign"></i><span className="navlink-text d-none-sm">Sales</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/dashboard/messages">
                                        <i className="far fa-comment-alt"></i> <span className="navlink-text d-none-sm">Messages</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <div className="user-settings">
                                <div className="setting-option">
                                    <i className="fas fa-cog"></i> Settings
                                </div>
                                <div id="tooltipbutton" className="more-options">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                                <UncontrolledPopover placement="top" target="tooltipbutton">
                                        <PopoverBody>
                                         <Nav vertical>
                                         <NavItem>
                                        <NavLink className="link-text" href="#">
                                        <i className="fas fa-info-circle"></i> <span className="navlink-text">Help</span>
                                        </NavLink>
                                       </NavItem>
                                       <NavItem>
                                        <NavLink className="link-text" href="*" onClick={e => handleLogout(e)}>
                                        <i className="fas fa-sign-out-alt"></i> <span className="navlink-text">Logout</span>
                                        </NavLink>
                                       </NavItem>
                                         </Nav>
                                        </PopoverBody>
                                </UncontrolledPopover>
                            </div>
                        </div>
                    </Col>
                </> :  <>
                    <DashboardLoadingSkeleton />
                </> 
            }
        </>
}

const mapStateToProps = (state) => ({
   school: state.school,
   user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    loGout : (history) => dispatch(logout(history)),
    getSchool : () => dispatch(getDefaultSchool()),
    getLoggedInUser : () => dispatch(loadUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardNavbar))
