import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { 
    Row,
    Col,
    Container,
    Button,
} from "reactstrap"
import { Link } from 'react-router-dom'
import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../../../actions/types"
import DashboardNavbar from "../DashboardNavbar"
import Barchat from "./Barchat"
import stripeLogo from "../../../images/stripelogo.png"
import paystackLogo from '../../../images/paystacklogo.png'

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

                        <div className="payment-setup__contents">
                        <div className="section-header">
                            Payment Method
                        </div>
                        <div className="payment-method-list">
                            <div className="payment-method__item">
                                <img src={paystackLogo} className="img-fluid" alt="paystack logo" />
                                <label class="switch">
                                    <input type="checkbox" id="togBtn" />
                                    <div class="slider round">
                                    {/* <!--ADDED HTML --> */}
                                    <span class="on">Enabled</span>
                                    <span class="off">Disabled</span>
                                    {/* <!--END--> */}
                                    </div>
                                </label>
                                <Button className="payment-method__item-btn"
                                 tag={Link}>Enter Account Info</Button>
                            </div>
                            <div className="payment-method__item">
                                <img src={stripeLogo} className="img-fluid" alt="stripe logo" />
                                <label class="switch">
                                    <input type="checkbox" id="togBtn" />
                                    <div class="slider round">
                                    {/* <!--ADDED HTML --> */}
                                    <span class="on">Enabled</span>
                                    <span class="off">Disabled</span>
                                    {/* <!--END--> */}
                                    </div>
                                </label>
                                <Button className="payment-method__item-btn"
                                 tag={Link}>Enter Account Info</Button>
                            </div>
                        </div>
                        </div>
                        
                     <div className="sales-page__contents">
                        <div className="section-header">
                            Payment History
                        </div>
                         <div className="payment-history__container">
                            <Container>
                                <Row>
                                    <Col sm="12" md="12" lg="7">
                                  <div className="chart-container">
                                    <Barchat />
                                 </div>
                                    </Col>
                                    <Col sm="12" md="12" lg="5">
                                    <div className="sales-breakdown__info ml-2">
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
                                    </Col>
                                </Row>
                            </Container>
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