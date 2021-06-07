import React from 'react'
import { 
    Row,
    Col,
    Container
} from "reactstrap"
import DashboardNavbar from "../DashboardNavbar"

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
                        
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
</>
}

export default Messages