import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from "axios"
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
import { accountSetupTwo } from "../../actions/account"
import PublicNavbar from "../layout/PublicNavbar"
import FieldSuggestContainer from "./FieldSuggestContainer"

import "../../custom-styles/account-setup/setuppagetwo.css"

const Setuppagetwo = ({ accountSetup, history }) => {

    const [ formData, setFormData ] = useState({
        field:"",
        about:""
    })
    const [ validationInfo, setValidationInfo ] = useState({
        validField: true
    })
    const [ fieldResults, setFieldResults ] = useState([])

    const { field, about } = formData

    useEffect(() => {
        if(field.length > 0){
            getFieldsOnType(field)
        }
    }, [field])

    const getFieldsOnType = async (query) => {
        try {
            const res = await axios.get(`/api/v1/coursetype/coursetitle?data=${query}`)
            setFieldResults(res.data)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    const updateFormData = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const { validField } = validationInfo

    const checkInputsOnBlur = (e, validationName) => {
        if(e.target.value.length === 0){
            setValidationInfo({
                ...validationInfo,
                [validationName]: false
            })
        } else {
            setValidationInfo({
                ...validationInfo,
                [validationName]: true
            })
        }
    }

    const updateFieldData = (e, validationName) => {
        updateFormData(e)
        if(e.target.value.length === 0){
            setValidationInfo({
                ...validationInfo,
                [validationName]: false
            })
        } else {
            setValidationInfo({
                ...validationInfo,
                [validationName]: true
            })
        }
    }

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
        <Form onSubmit={e => submitData(e)}>
           <FormGroup>
        <Input
             className="form-control-alternative input-Style form__input"
             type="text"
             name="field"
             value={field}
             onChange={e => updateFieldData(e, "validField")}
             onBlur={e => checkInputsOnBlur(e, "validField")}
             required
             autoFocus
             >
        </Input>
        {
            !validField && <p className="form-warning">field cannot be empty</p>
        }
        {
           field.length > 0 && <FieldSuggestContainer suggestions={fieldResults} />
        }
    </FormGroup>
            <FormGroup>
            <Input
            className="form__input"
            placeholder="About me"
            rows="5"
            type="textarea"
            name="about"
            autoComplete="off"
            value={about}
            onChange={e => updateFormData(e)}
          />
            </FormGroup>
            <FormGroup className="mt-5">
            <Button
            className="accout-setup-btn"
             type="submit"
             size="lg"
             disabled={
                !validField
             }
             >
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

const mapDispatchToProps = (dispatch) => ({
    accountSetup : (formData, history) => dispatch(accountSetupTwo(formData, history))
})

export default connect(null, mapDispatchToProps)(withRouter(Setuppagetwo))
