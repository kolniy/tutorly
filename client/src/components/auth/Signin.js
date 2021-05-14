import React, { useState } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
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
import { signIn } from "../../actions/auth"
import PublicNavbar from "../layout/PublicNavbar"

import "../../custom-styles/auth/signin.css"

const Signin = ({ signInUser, history }) => {

      const [ userCredentials, setUserCredentials ] = useState({
        email: "",
        password:""
      })

      const updateUserCredentials = (e) => setUserCredentials({
        ...userCredentials,
        [e.target.name]: e.target.value
      })

      const formSubmit = (e) => {
        e.preventDefault()
        signInUser(userCredentials, history)
      }

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
        <Form onSubmit={e => formSubmit(e)}>
          <FormGroup>
             <Input
                    className="form-control-alternative"
                     placeholder="Johnsmith@gmail.com"
                     type="email"
                     name="email"
                     required
                     onChange={e => updateUserCredentials(e)}
                />
           </FormGroup>
            <FormGroup>
             <Input
                    className="form-control-alternative"
                     placeholder="your password"
                     type="password"
                     name="password"
                     required
                     onChange={e => updateUserCredentials(e)}
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

const mapDispatchToProps = (dispatch) => ({
   signInUser : (formData, history) => dispatch(signIn(formData, history))
})

export default connect(null, mapDispatchToProps)(withRouter(Signin))
