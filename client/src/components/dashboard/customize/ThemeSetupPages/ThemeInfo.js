import React from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap"
import DashboardNavbar from '../../DashboardNavbar'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/customize.css"

export const ThemeInfo = () => {
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
                        <p className="page-subtitle">Fill in Your Landing Page Details</p>
                        <div className="theme-preview-container">
                           <div className="theme-setup">
                            <div className="form-container">
                            <Form>
                            <FormGroup>
                             <input
                               type="text"
                               className="form__input"
                               placeholder="Heading"
                               name="themeheading"
                               id="themeheading"
                               required
                               autoFocus
                               autoComplete="off"
                               />
                            <label for="themeheading" className="form__label">Heading</label>
                            </FormGroup>
                            <FormGroup>
                             <input
                               type="text"
                               className="form__input"
                               placeholder="Sub Heading"
                               name="subheading"
                               id="subheading"
                               required
                               autoFocus
                               autoComplete="off"
                               />
                            <label for="subheading" className="form__label">Sub Heading</label>
                            <div className="instructions-tag">
                               e.g "A Traditional Australian Chef Masterclass"
                            </div>
                            </FormGroup>
                            <FormGroup>
                             <input
                               type="text"
                               className="form__input"
                               placeholder="Name of your school"
                               name="schoolname"
                               id="schoolname"
                               required
                               autoFocus
                               autoComplete="off"
                               />
                            <label for="schoolname" className="form__label">Name of your school</label>
                            </FormGroup>
                            <FormGroup>
                             <Input
                             className="form__input"
                             placeholder="About School"
                             rows="5"
                             type="textarea"
                             name="aboutschool"
                             autoComplete="off"
                            />
                            </FormGroup>
                            <FormGroup className="mt-5">
                                <Button
                                className="customize-page-btn"
                                type="submit"
                                size="lg"
                                >
                                   Next
                                </Button>
                            </FormGroup>
                             </Form>
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

export default ThemeInfo
