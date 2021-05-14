import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import axios from "axios"
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
import { accountSetupOne } from "../../actions/account"
import PublicNavbar from "../layout/PublicNavbar"

import "../../custom-styles/account-setup/setuppageone.css"

const Setuppageone = ({
    accountSetup,
    user,
    history
}) => {

    const [ formData, setFormData ] = useState({
        firstname: "",
        lastname: "",
        username: ""
    })
    const [ validationInfo, setValidationInfo ] = useState({
        validFirstname: true,
        validLastname: true,
        validUsername: true
    })

    const [ existingUserByUsername, setExistingUserByUsername ] = useState([])

    const { firstname, lastname, username } = formData
    const { validFirstname, validLastname, validUsername } = validationInfo
    const updateFormData = (e, validationName) => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       })
       if(e.target.value.length === 0){
        setValidationInfo({
            ...validationInfo,
            [validationName]: false
        })
       } else if(e.target.value.length > 0){
        setValidationInfo({
            ...validationInfo,
            [validationName]: true
        })
       }
    }

    const checkInputOnBlur = (e, validationName) => {
        if(e.target.value.length === 0){
            setValidationInfo({
                ...validationInfo,
                [validationName]: false
            })
           } else if(e.target.value.length > 0){
            setValidationInfo({
                ...validationInfo,
                [validationName]: true
            })
           }
    }

    const getExistingUserByUsername = async (searchQuery) => {
        try {
            if(searchQuery.length !== 0){
                const res = await axios.get(`/api/v1/user/account/setup/existinguser/username?username=${searchQuery}`)
                setExistingUserByUsername(res.data)
            } else {
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(username?.length > 0){
            getExistingUserByUsername(username)
        } else {
            return
        }
    }, [username])

    useEffect(() => {
        if(user !== null){
            let userFirstName = user.firstname
            let userLastname = user.lastname
            let userName = user.username
            setFormData({
                firstname: userFirstName,
                lastname: userLastname,
                username: userName
            })
        }
    }, [user])

    const submitData = (e) => {
        e.preventDefault()
       accountSetup(formData, history)
    }

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
        <Form onSubmit={e => submitData(e)}>
          <FormGroup>
          <input
            type="text"
            class="form__input"
            placeholder="First name"
            name="firstname"
            id="firstname"
            value={firstname}
            onChange={e => updateFormData(e, "validFirstname")}
            onBlur={e => checkInputOnBlur(e, "validFirstname")}
            required
            autoFocus
            />
          <label for="firstname" className="form__label">First Name</label>
          {
            !validFirstname && <p className="form-warning">firstname cannot be empty</p>
          }
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Last name"
            name="lastname"
            id="lastname"
            value={lastname}
            onChange={e => updateFormData(e, "validLastname")}
            onBlur={e => checkInputOnBlur(e, "validLastname")}
             required
            />
            <label for="lastname" className="form__label">Last Name</label>
            {
            !validLastname && <p className="form-warning">lastname cannot be empty</p>
            }
        </FormGroup>
         <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Username"
            name="username"
            id="username"
            value={username}
            onChange={e => updateFormData(e, "validUsername")}
            onBlur={e => checkInputOnBlur(e, "validUsername")}
             required
            />
            <label for="username" className="form__label">Username</label>
            <div className="username-info">
                Your username would be used to form your personal
                URL, so select this very carefully
            </div>
          {
            !validUsername && <p className="form-warning">Username cannot be empty</p>
          }
          {
             existingUserByUsername.length > 0 && <p className="form-warning">username already exists</p>
          }
        </FormGroup>
            <FormGroup className="mt-5">
            <Button
            className="accout-setup-btn"
             type="submit"
             size="lg"
             disabled={ 
                 !validFirstname ||
                 !validLastname  ||
                 !validUsername  ||
                 existingUserByUsername.length > 0
             }
             >
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

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    accountSetup : (formData, history) => dispatch(accountSetupOne(formData, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Setuppageone))
