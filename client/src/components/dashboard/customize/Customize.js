import React from 'react'
import { 
    Row,
    Col,
    Container,
    Input,
    FormGroup,
    Button
} from "reactstrap"
import DashboardNavbar from "../DashboardNavbar"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/customize.css"

const Customize = () => {
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
                         <div className="display-setup">
                             <h3 className="setup-title">
                                 Display Setup
                             </h3>
                             <div className="display-setup__viewer">
                                <Row>
                                    <Col sm="9" md="9">
                                       <div className="display-setup__previewer">
                                           <div className="previewer-header"></div>
                                           <div className="previewer-body">
                                               <div className="previewer-container">
                                                   <div className="block-container">
                                                        <div className="display-block-large"></div>
                                                        <div className="display-block-medium"></div>
                                                        <div className="display-block-medium"></div>
                                                        <div className="display-block-medium"></div>
                                                   </div>
                                                   <div className="typography-container">
                                                        <h3 className="typo-header">Header</h3>
                                                        <h1 className="h1 typography-header-previewer">
                                                            Aa
                                                        </h1>              
                                                        <p className="typo-paragraph">Paragraph</p>
                                                        <p className="typo-paragraph-previewer">Aa</p>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                    </Col>
                                    <Col sm="3" md="3">
                                        <div className="display-setup__selector">
                                        <FormGroup className="color-picker__form-group">
                                            <Input type="select">                                            
                                             <option value="deepblue">Deep Blue</option>
                                             <option value="black">Black</option>
                                             <option value="blue">Blue</option>
                                             <option value="red">Red</option>
                                             <option value="orange">Orange</option>
                                            </Input>
                                            <div className="color-picked"></div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="select">                                            
                                             <option value="">Header Font Type</option>
                                             <option value="black">Black</option>
                                             <option value="blue">Blue</option>
                                             <option value="red">Red</option>
                                             <option value="orange">Orange</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input placeholder="Header Font Size" type="number">
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="select">                                            
                                             <option value="deepblue">Paragraph Font Type</option>
                                             <option value="black">Black</option>
                                             <option value="blue">Blue</option>
                                             <option value="red">Red</option>
                                             <option value="orange">Orange</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input placeholder="Paragraph Font Size" type="number">   
                                            </Input>
                                        </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                             </div>
                         </div>
                    </div>
                       </div>
                      <section className="media-section">
                        <h2 className="media-section__header">
                            Media Upload
                        </h2>
                        <Row>
                            <Col sm="8" md="8">
                                <div className="upload-controllers">
                                <FormGroup>
                                <Input placeholder="Upload Logo" type="input">
                                </Input>
                                <Button className="mt-4 upload-ctr-btn-styles" size="large">Upload</Button>
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Upload Background Skin" type="input">
                                </Input>
                                <Button className="mt-4 mb-3 upload-ctr-btn-styles" size="large">Upload</Button>
                            </FormGroup>
                                </div>
                            </Col>
                            <Col sm="4" md="4"></Col>
                        </Row>
                      </section>
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
</>
}

export default Customize