import React from 'react'
import { 
    Row,
    Col,
    Container
} from "reactstrap"
import DashboardNavbar from "../DashboardNavbar"
import MessagesContainer from "./MessagesContainer"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/messages.css"

const Messages = () => {
    return <>
    <div className="dashboard-layout">
        <Container fluid>
            <Row>
               <DashboardNavbar />
                <Col>
                   <div className="page-actions">
                        <div className="messages-page">
                        <div className="messages-page__contents">
                            <h3 className="page-title">
                                 Messages
                            </h3>
                        <MessagesContainer />
                        </div>
                        </div>
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
</>
}

export default Messages