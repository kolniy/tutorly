import React from 'react'
import { 
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Form,
    FormGroup
} from "reactstrap"

import PublicNavbar from "../layout/PublicNavbar"

import "../../custom-styles/account-setup/setuppageone.css"

const Setuppageone = () => {
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
                            <div className="step-counter-number">
                                    2
                                </div>
                                <div className="step-counter-text">
                                    Profile
                                </div>
                            </div>
                    </div>
            <Card className="shadow account-setup__page-one">
          <CardBody>
          <h1 className="setup-info text-center">
            Fill in the form to complete account setup
          </h1>
        <Form>
          <FormGroup>
          <input
            type="text"
            class="form__input"
            placeholder="First name"
            name="firstname"
            id="firstname"
             required
            />
          <label for="firstname" className="form__label">First Name</label>
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Last name"
            name="lastname"
            id="lastname"
             required
            />
            <label for="lastname" className="form__label">Last Name</label>
            </FormGroup>
         <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Username"
            name="username"
            id="username"
             required
            />
            <label for="username" className="form__label">Username</label>
            <div className="username-info">
                Your username would be used to form your personal
                URL, so select this very carefully
            </div>
        </FormGroup>
            <FormGroup className="mt-5">
            <Button
            className="accout-setup-btn"
             type="submit"
             size="lg">
                Next
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

export default Setuppageone
