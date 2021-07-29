import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { 
    Row,
    Col,
    Container,
    Button
} from "reactstrap"
import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../../../actions/types"
import DashboardNavbar from "../DashboardNavbar"
import Barchat from "./Barchat"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/sales.css"

const Sales = ({ 
    updatePageSelector
}) => {

    useEffect(() => {
        updatePageSelector(4)
        // eslint-disable-next-line
    }, [])

    return <>
    <div className="dashboard-layout">
        <Container fluid>
            <Row>
               <DashboardNavbar />
                <Col>
                   <div className="page-actions">
                        <div className="sales-page">
                          <div className="sales-page__contents">
                            <h3 className="page-title">Sales</h3>
                            <div className="subscription-info">
                                <p className="subscription-info-text">Subscription Price/Candidate</p>
                                <div className="subscription-actions">
                                    <div className="subscription-cost-container">
                                        $99.00
                                    </div>
                                    <Button color="default" className="subscription-accept-button">
                                        Accept
                                    </Button>
                                </div>
                            </div>
                            <div className="chart-container">
                            <Barchat />
                            </div>
                           <div className="sales-breakdown__info">
                           <div className="total-sales-info_container">
                                <p className="total-sales_info">Total Sales</p>
                                <h1>$11099.00</h1>
                            </div>
                            <div className="monthly-sale-info_container">
                                <p className="monthly-sale_info">
                                    Sales this Month
                                </p>
                                <h1>$599.00</h1>
                            </div>
                           </div>
                        </div>
                        </div>
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
</>
}

const mapDispatchToProps = (dispatch) => ({
  updatePageSelector: (counter) => dispatch({type: UPDATE_DASHBOARD_PAGE_COUNTER, payload:counter })
})

export default connect(null, mapDispatchToProps)(Sales)