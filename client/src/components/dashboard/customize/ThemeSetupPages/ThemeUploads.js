import React from 'react'
import { Container, Row, Col, Button } from "reactstrap"
import DashboardNavbar from '../../DashboardNavbar'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/customize.css"

export const ThemeUploads = () => {
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
                        <p className="page-subtitle">Upload your media</p>
                        <div className="theme-preview-container">
                           <div className="theme-setup">
                              <div className="uploads-container">
                                <div className="upload-banner-section">
                                    <p className="text-black">Upload banner photo</p>
                                    <Row>
                                        <Col md="8">
                                        <div className="banner-preview">
                                            <img 
                                            src="https://res.cloudinary.com/thawebguy/image/upload/v1625221263/tuturly/default%20theme%20assets/hero-image_cgkrdx.png"
                                            alt="hero preview thumbnail"
                                            className="img-fluid"
                                            />
                                        </div>
                                        </Col>
                                        <Col md="4">
                                        <div className="upload-button">
                                            <Button className="customize-upload-btn" size="large">Upload</Button>
                                        </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="upload-photo-section">
                                    <p className="text-black mb-4">Upload photo</p>
                                    <Row>
                                        <Col md="8">
                                        <div className="upload-photo-preview-container">
                                            <img
                                            src="https://res.cloudinary.com/thawebguy/image/upload/v1625223376/tuturly/default%20theme%20assets/author-image_c4vdrq.png"
                                            className="img-fluid"
                                            alt="upload theme previewer"
                                            />
                                        </div>
                                        </Col>
                                        <Col md="4">
                                        <div className="upload-button">
                                            <Button className="customize-upload-btn" size="large">Upload</Button>
                                        </div>
                                        </Col>
                                    </Row>
                                </div>
                                <Button
                                className="customize-page-btn mt-6 mb-4"
                                type="submit"
                                size="lg"
                                >
                                   Next
                                </Button>
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

export default ThemeUploads