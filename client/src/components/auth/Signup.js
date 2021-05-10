import React, { useState } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
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
import { signUp } from "../../actions/auth"
import PublicNavbar from "../layout/PublicNavbar"
import validateEmail from "../../utilities/validateEmail"

import "../../custom-styles/auth/signup.css"


const Signup = ({ signupUser, history }) => {

    const [ formData, setFormData ] = useState({
      email: "",
      password: ""
    })

    const [ validationInfo, setValidationInfo ] = useState({
      validEmail: false,
      validPassword: false
    })
    const [ acceptedTerms, setAcceptedTerms ] = useState(false)
    const [ showTermsWarning, setshowTermsWarning ] = useState(false)
    const { validEmail, validPassword } = validationInfo
    
    const { email, password } = formData

   const updateEmailValidation = () => {
      if(validateEmail(email)){
        setValidationInfo({
          ...validationInfo,
          validEmail: true
        })
      } else {
        setValidationInfo({
          ...validationInfo,
          validEmail: false
        })
      }
   }

   const updatePasswordValidation = () => {
      if(password.length >= 6){
        setValidationInfo({
          ...validationInfo,
          validPassword: true
        })
      } else {
        setValidationInfo({
          ...validationInfo,
          validPassword: false
        })
      }
   }

    const updateEmail = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
      updateEmailValidation()
    }

    const updatePassword = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
      updatePasswordValidation()
    }

    const updateTermsConditionAcceptedState = () => {
      setAcceptedTerms(!acceptedTerms)
      setshowTermsWarning(false)
    }

    const submitForm = (e) => {
      e.preventDefault()
      if(acceptedTerms === false){
        setshowTermsWarning(true)
      } else {
        signupUser(formData, history)
      }
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
            <h1 className="text-center page-heading">Sign up</h1>
        <Form onSubmit={submitForm}>
          <FormGroup>
             <Input
                    className="form-control-alternative"
                     placeholder="Johnsmith@gmail.com"
                     type="email"
                     name="email"
                     value={email}
                     onChange={e => updateEmail(e)}
                     required
                />
                {
                 email.length > 0 && !validEmail && <p className="form-warning">use a valid email address</p>
                }
           </FormGroup>
            <FormGroup className="remove-margin">
             <Input
                    className="form-control-alternative"
                     placeholder="your password"
                     type="password"
                     name="password"
                     value={password}
                     onChange={e => updatePassword(e)}
                     required
                />
                 {
                  password.length > 0 && !validPassword && <p className="form-warning">invalid password</p>
                }
            </FormGroup>

        <div className="terms-condition-text">
          <input
            id="terms-and-condition-check"
            type="checkbox"
            className="terms-and-condition-checkbox"
            checked={acceptedTerms}
            onChange={updateTermsConditionAcceptedState}
          />
          <label className="ml-2" htmlFor="terms-and-condition-check">
            i accept the <span className="terms-condition-highlight">terms of use</span> & <span className="terms-condition-highlight">privacy policy</span>
          </label>
          {
             showTermsWarning && <p className="form-warning">You must accept our terms of use & privacy policy</p>
          }
        </div>

            <FormGroup>
            <Button
            className="signin-btn"
             type="submit"
             size="lg"
            disabled={ !validEmail || !validPassword }
             >
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

const mapDispatchToProps = (dispatch) => ({
    signupUser : (formData, history) => dispatch(signUp(formData, history))
})

export default connect(null, mapDispatchToProps)(withRouter(Signup))
