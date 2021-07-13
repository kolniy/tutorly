import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Container, Row, Col, Button, FormGroup } from "reactstrap"
import { useAlert } from "react-alert"
import { getTheme, updateThemeContactInfo } from "../../../../actions/theme"
import ReactFlagsSelect from "react-flags-select"
import DashboardNavbar from '../../DashboardNavbar'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/customize.css"


export const ThemeContact = ({ 
    theme,
    school,
    updateContactInfo,
    getSchoolTheme,
    history
}) => {

    const [ formData, setFormData ] = useState({
        address: '',
        phone: '',
        phonecc: '234',
        googleurl: '',
        facebookurl: '',
        twitterurl: '',
        instagramurl: '',
        youtubeurl: '',
    })

    const alert = useAlert()
    const { address, phone, phonecc, googleurl, facebookurl, twitterurl, instagramurl, youtubeurl } = formData

    const updateFormFields = (e) => (
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    )

    const submitFormContactHandler = () => {
        if(address.length === 0){
            return alert.show("address is required", {
                type: 'error'
            })
        }
        if(phone.length === 0){
            return alert.show("phone number is required", {
                type: 'error'
            })
        }
        if(phonecc.length === 0){
            return alert.show("phone country code is required", {
                type: 'error'
            })
        }
        updateContactInfo(formData, school._id, school.name, history)
    }

    useEffect(() => {
        if(theme !== null){
            let address = theme.contactaddress !== undefined ? theme.contactaddress : ''
            let phone = theme.phonenumber !== undefined ? theme.phonenumber : ''
            let cc = theme.countryphonecode !== undefined ? theme.countryphonecode : '234'
            let google = theme.googleurl !== undefined ? theme.googleurl : ''
            let facebook = theme.facebookurl !== undefined ? theme.facebookurl : ''
            let instagram = theme.instagramurl !== undefined ? theme.instagramurl : ''
            let youtube = theme.youtubeurl !== undefined ? theme.youtubeurl : ''
            let twitter = theme.twitterurl !== undefined ? theme.twitterurl : ''
            setFormData({
                address,
                phone,
                phonecc:cc,
                googleurl: google,
                facebookurl: facebook,
                instagramurl: instagram,
                youtubeurl: youtube,
                twitterurl: twitter
            })
        }
    }, [theme])

    useEffect(() => {
        if(school){
            getSchoolTheme(school._id)
        }
    }, [getSchoolTheme, school])

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
                        <p className="page-subtitle">Contact information</p>
                        <div className="theme-preview-container">
                           <div className="theme-setup">
                            <div className="update-contact-section">
                            <FormGroup>
                            <input
                               type="text"
                               class="form__input"
                               placeholder="Address"
                               name="address"
                               id="address"
                               value={address}
                               required
                               autoFocus
                               autoComplete="off"
                               onChange={e => updateFormFields(e)}
                               />
                            <label for="themeheading" className="form__label">Address</label>
                            </FormGroup>
                            <div className="phone-number-input-container">
                            <Row>
                                <Col xs="4" sm="4" md="4">
                                <ReactFlagsSelect
                                    showSecondaryOptionLabel={false}
                                    selectButtonClassName="menu-flags-button"
                                // selected={}
                                // onSelect={}
                                />
                                </Col>
                                <Col xs="8" sm="8" md="8">
                                <FormGroup>
                                    <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Phone No."
                                    name="phone"
                                    id="phone"
                                    value={phone}
                                    required
                                    autoFocus
                                    autoComplete="off"
                                    onChange={e => updateFormFields(e)}
                                    />
                                    <label for="phone" className="form__label">Address</label>
                            </FormGroup>
                                </Col>
                            </Row>
                            </div>
                            <div className="social-urls">
                                <p className="text-black">Enter your social media URLs</p>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-google icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="googleurl"
                                    id="googleurl"
                                    value={googleurl}
                                    autoComplete="off"
                                    onChange={e => updateFormFields(e)}
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-youtube icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="youtubeurl"
                                    id="youtubeurl"
                                    value={youtubeurl}
                                    autoComplete="off"
                                    onChange={e => updateFormFields(e)}
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-twitter icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="twitterurl"
                                    id="twitterurl"
                                    value={twitterurl}
                                    autoComplete="off"
                                    onChange={e => updateFormFields(e)}
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                <i class="fab fa-instagram icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="instagramurl"
                                    id="instagramurl"
                                    value={instagramurl}
                                    autoComplete="off"
                                    onChange={e => updateFormFields(e)}
                                    />
                                </div>
                                <div className="social-icon-and-input">
                                    <i class="fab fa-facebook icon-styles"></i>
                                   <input
                                    type="text"
                                    class="form__input"
                                    placeholder="Enter URL"
                                    name="facebookurl"
                                    id="facebookurl"
                                    value={facebookurl}
                                    autoComplete="off"
                                    onChange={e => updateFormFields(e)}
                                    />
                                </div>
                            </div>
                            <Button onClick={submitFormContactHandler} className="customize-page-btn mb-4" size="large">Save</Button>
                            </div>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    </div>
    </>
}

const mapStateToProps = (state) => ({
   theme: state.theme.schoolTheme,
   school: state.school.schoolDetails
})

const mapDispatchToProps = (dispatch) => ({
    getSchoolTheme: (schoolId) => dispatch(getTheme(schoolId)),
    updateContactInfo: (formData, schoolId, schoolName, history) => dispatch(updateThemeContactInfo(formData, schoolId, schoolName, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThemeContact))
