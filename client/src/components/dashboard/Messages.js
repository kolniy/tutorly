import React from 'react'
import { Link } from "react-router-dom"
import { 
    Row,
    Col,
    Container,
    Nav, 
    NavItem, 
    NavLink,
    PopoverBody,
    UncontrolledPopover
} from "reactstrap"
import dummyAvatar from "../../images/dummy-avatar.png"

import "../../custom-styles/dashboard/dashboardlayout.css";

const Messages = () => {
    return <>
    <div className="dashboard-layout">
        <Container fluid>
            <Row>
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
                        <p className="logged-in-user__school-name d-none-sm">Eustice Jack Film School</p>
                        <p className="logged-in-user__email d-none-sm">eusticethemenace2020@gmail.com</p>
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
                                    <NavLink className="link-text" href="#">
                                    <i className="fas fa-sign-out-alt"></i> <span className="navlink-text">Logout</span>
                                    </NavLink>
                                   </NavItem>
                                     </Nav>
                                    </PopoverBody>
                            </UncontrolledPopover>
                        </div>
                    </div>
                </Col>
                <Col>
                   <div className="page-actions">
                        
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
</>
}

export default Messages