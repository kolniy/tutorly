import React from 'react'
import { 
    Row,
    Container,
    Col,
    Button,
    Card,
    CardBody,
    Input,
    Form,
    FormGroup
} from "reactstrap"
import { Link } from "react-router-dom"
import PublicNavbar from "../layout/PublicNavbar"

import "../../custom-styles/auth/signup.css"


const Signup = () => {
    return <>
        <PublicNavbar />
        <br/>
        <br/>
        <Container>
            <Row>
         <Col sm="3"></Col>
        <Col sm="6">
        <Card className="shadow card-style">
        <CardBody>
            <h1 className="text-center page-heading">Sign up</h1>
        <Form>
          <FormGroup>
             <Input
                    className="form-control-alternative"
                     placeholder="Johnsmith@gmail.com"
                     type="email"
                     name="email"
                     required
                />
           </FormGroup>
            <FormGroup className="remove-margin">
             <Input
                    className="form-control-alternative"
                     placeholder="your password"
                     type="passord"
                     name="passord"
                     required
                />
            </FormGroup>

        <div className="terms-condition-text">
          <input
            id="terms-and-condition-check"
            type="checkbox"
            className="terms-and-condition-checkbox"
          />
          <label className="ml-2" htmlFor="terms-and-condition-check">
            i accept the <span className="terms-condition-highlight">term of use</span> & <span className="terms-condition-highlight">privacy policy</span>
          </label>
        </div>

            <FormGroup>
            <Button
            className="signin-btn"
             type="submit"
             size="lg">
                 Submit
             </Button>
          </FormGroup>
          <p className="lead login-cta">
              Already have an account? <Link to="/signin">
                Login here 
              </Link>
          </p>
          </Form>
          </CardBody>
        </Card>
        </Col>
        <Col sm="3"></Col>
           </Row>
        </Container>
    </>
}

export default Signup
