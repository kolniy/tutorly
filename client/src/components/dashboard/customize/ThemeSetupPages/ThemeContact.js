import React from 'react'
import { Container, Row, Col, Button, FormGroup } from "reactstrap"
import ReactFlagsSelect from "react-flags-select"
import DashboardNavbar from '../../DashboardNavbar'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/customize.css"


export const ThemeContact = () => {
    return <>
        <div className="dashboard-layout">
        <Container fluid>
            <Row>
                <DashboardNavbar />
                <Col>
                <div className="page-actions">
                  <div className="customize-page">
                    <div className="customize-page__contents">
                        <h3 className="page-title">Customize space</h3>
                        <p className="page-subtitle">Contact information</p>
                        <div className="theme-preview-container">
                           <div className="theme-setup">
                            <div className="update-contact-section">
                            <FormGroup>
                            <input
                               type="text"
                               class="form__input"
                               placeholder="Address"
                               name="address"
                               id="address"
                               required
                               autoFocus
                               autoComplete="off"
                               />
                            <label for="themeheading" className="form__label">Address</label>
                            </FormGroup>
                            <div className="phone-number-input-container">
                            <Row>
                                <Col xs="4" sm="4" md="4">
                                <ReactFlagsSelect
                                    showSecondaryOptionLabel={false}
                                    selectButtonClassName="menu-flags-button"
                                // selected={}
                                // onSelect={}
                                />
                                </Col>
                                <Col xs="8" sm="8" md="8">
                                <FormGroup>
                                    <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Phone No."
                                    name="phone"
                                    id="phone"
                                    required
                                    autoFocus
                                    autoComplete="off"
                                    />
                                    <label for="phone" className="form__label">Address</label>
                            </FormGroup>
                                </Col>
                            </Row>
                            </div>
                            <div className="social-urls">
                                <p className="text-black">Enter your social media URLs</p>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-google icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="google"
                                    id="google"
                                    autoComplete="off"
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-youtube icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="youtube"
                                    id="youtube"
                                    autoComplete="off"
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-twitter icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="twitter"
                                    id="twitter"
                                    autoComplete="off"
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                <i class="fab fa-instagram icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="instagram"
                                    id="instagram"
                                    autoComplete="off"
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-facebook icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="facebook"
                                    id="facebook"
                                    autoComplete="off"
                                    />
                                </div>
                            </div>
                            <Button className="customize-page-btn mb-4" size="large">Save</Button>
                            </div>
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

export default ThemeContact
