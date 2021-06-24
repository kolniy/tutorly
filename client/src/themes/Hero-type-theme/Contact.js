import React from 'react'
import { Button, 
    Container, 
    Row,
    Col, 
    Form, 
    FormGroup, 
    Input } from "reactstrap"

export const Contact = () => {
    return <>
        <section className="contact">
            <Container>
                <Row>
                    <Col sm="6" md="6">
                        <div className="contact-info">
                            <h2 className="contact-header">Contact Us</h2>
                            <p className="contact-paragraph">94602 San Pablo Avenue,</p>
                            <p className="contact-paragraph">oakland califonia</p>
                            <p className="contact-paragraph">phone no:xxx xxxx xxxxx</p>
                        </div>
                    </Col>
                    <Col sm="6" md="6">
                        <div className="contact-form">
                            <p className="contact-form-question">
                                Got any questions?
                            </p>
                            <Form>
                            <FormGroup>
                            <Input
                                className="form-control-alternative input-Style form__input"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                >
                            </Input>
                            </FormGroup>
                            <FormGroup>
                            <Input
                                className="form-control-alternative input-Style form__input"
                                type="email"
                                name="email"
                                placeholder="Enter a valid email"
                                >
                            </Input>
                            </FormGroup>
                                <FormGroup>
                                <Input
                                className="form__input"
                                placeholder="Type Your Message"
                                rows="5"
                                type="textarea"
                                name="about"
                                autoComplete="off"
                            />
                                </FormGroup>
                                <FormGroup>
                                <Button
                                type="submit"
                                size="lg"
                                >
                                    Submit
                                </Button>
                            </FormGroup>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
}

export default Contact