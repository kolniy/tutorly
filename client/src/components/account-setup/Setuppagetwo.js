import React from 'react'
import {
    Container,
    Col,
    Row,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Button
} from "reactstrap"
import PublicNavbar from "../layout/PublicNavbar"

import "../../custom-styles/account-setup/setuppagetwo.css"

const Setuppagetwo = () => {
    return <>
    <PublicNavbar />
    <br />
    <br />
    <Container>
            <Row>
                <Col md="2" sm="2"></Col>
                <Col md="8" sm="8">
                    <div className="progress-container">
                            <div className="step-counter text-center mr-5">
                                <div className="step-counter-number step-counter-number__coloured">
                                    1
                                </div>
                                <div className="step-counter-text">
                                    Basic info
                                </div>
                            </div>
                            <div className="step-counter text-center">
                            <div className="step-counter-number step-counter-number__coloured">
                                    2
                                </div>
                                <div className="step-counter-text">
                                    Profile
                                </div>
                            </div>
                    </div>
            <Card className="shadow account-setup__page-two">
          <CardBody>
          <h1 className="setup-info text-center">
            Fill in the form to complete account setup
          </h1>
        <Form>
           <FormGroup>
        <Input
             className="form-control-alternative input-Style form__input"
             type="select"
             name="field"
             required
             >
            <option value="" placeholder="true">What field are you in?</option>
            <option value="Art">Art</option>
            <option value="ui/ux">UI/UX</option>
            <option value="computer science">computer science</option>
            <option value="software development">software development</option>
        </Input>
           </FormGroup>
            <FormGroup>
            <Input
            className="form__input"
            placeholder="About me"
            rows="5"
            type="textarea"
          />
            </FormGroup>
            <FormGroup className="mt-5">
            <Button
            className="accout-setup-btn"
             type="submit"
             size="lg">
                 Proceed
             </Button>
          </FormGroup>
          </Form>
          </CardBody>
        </Card>
                </Col>
                <Col md="2" sm="2"></Col>
            </Row>
        </Container>
        <br />
        <br />
    </>
}

export default Setuppagetwo
