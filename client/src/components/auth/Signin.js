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

import "../../custom-styles/auth/signin.css"

const Signin = () => {
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
          <h1 className="text-center page-heading">Login</h1>
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
            <FormGroup>
             <Input
                    className="form-control-alternative"
                     placeholder="your password"
                     type="passord"
                     name="passord"
                     required
                />
            </FormGroup>
            <FormGroup>
            <Button
            className="signin-btn"
             type="submit"
             size="lg">
                 Submit
             </Button>
          </FormGroup>
          <p className="lead signup-cta">
              Don't have an account? <Link to="/signup">
                Sign up here 
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

export default Signin
