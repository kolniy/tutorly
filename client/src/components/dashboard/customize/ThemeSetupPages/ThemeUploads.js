import React, { useEffect, useRef, useState } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap"
import { getTheme, updateThemeImage, updateThemeInstructorImage } from "../../../../actions/theme"
import DashboardNavbar from '../../DashboardNavbar'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/customize.css"

export const ThemeUploads = ({
    theme,
    school,
    getSchoolTheme,
    updateImage,
    updateInstructorImg,
    history
}) => {

    const bannerImageInputPicker = useRef(null)
    const instructorImageInputPicker = useRef(null)
    const [ uploads, setUploads ] = useState({
        bannerImg:null,
        aboutImg:null
    })

    const { bannerImg, aboutImg } = uploads

    const bannerImagePickerHandler = (e) => {
        let formData = new FormData()
        formData.append('banner', e.target.files[0])
        updateImage(formData, school._id)
    }

    const instructorImagePickerHandler = (e) => {
        let formData = new FormData()
        formData.append('about', e.target.files[0])
        updateInstructorImg(formData, school._id)
    }

    const handleBannerUploadClick = () => {
        bannerImageInputPicker.current.click()
    }

    const handleInstructorUploadClick = () => {
        instructorImageInputPicker.current.click()
    }

    const continueSetup = () => {
        history.push('/dashboard/customize/theme/setup/contactinfo')
    }

    useEffect(() => {
        if(theme !== null){
            let bannerImgUrl = theme.themeimage
            let aboutImgUrl = theme.instructorimage
            setUploads({
                bannerImg: bannerImgUrl,
                aboutImg: aboutImgUrl
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
                        <p className="page-subtitle">Upload your media</p>
                        <div className="theme-preview-container">
                           <div className="theme-setup">
                              <div className="uploads-container">
                                <div className="upload-banner-section">
                                    <p className="text-black">Upload banner photo</p>
                                    <Row>
                                        <Col md="8">
                                        <div className="banner-preview">
                                            <img 
                                            src={ bannerImg !== null ? bannerImg : undefined }
                                            alt="hero preview thumbnail"
                                            className="img-fluid"
                                            />
                                        </div>
                                        </Col>
                                        <Col md="4">
                                        <div className="upload-button">
                                            <Button onClick={handleBannerUploadClick} className="customize-upload-btn" size="large">Upload</Button>
                                        </div>
                                        <input
                                         type="file"
                                         id="banner-upload"
                                         style={{ display: 'none'}}
                                         onChange={e => bannerImagePickerHandler(e)}
                                         ref={bannerImageInputPicker} 
                                         />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="upload-photo-section">
                                    <p className="text-black mb-4">Upload photo</p>
                                    <Row>
                                        <Col md="8">
                                        <div className="upload-photo-preview-container">
                                            <img
                                            src={ aboutImg !== null ? aboutImg : undefined }
                                            className="img-fluid"
                                            alt="upload theme previewer"
                                            />
                                        </div>
                                        </Col>
                                        <Col md="4">
                                        <div className="upload-button">
                                            <Button onClick={handleInstructorUploadClick} className="customize-upload-btn" size="large">Upload</Button>
                                        </div>
                                        <input 
                                        type="file"
                                        id="about-upload"
                                        style={{display: 'none'}}
                                        onChange={e => instructorImagePickerHandler(e)}
                                        ref={instructorImageInputPicker}
                                        />
                                        </Col>
                                    </Row>
                                </div>
                                <Button
                                className="customize-page-btn mt-6 mb-4"
                                type="submit"
                                size="lg"
                                onClick={continueSetup}
                                >
                                   Next
                                </Button>
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
    updateImage: (formData, schoolId) => dispatch(updateThemeImage(formData, schoolId)),
    updateInstructorImg: (formData, schoolId) => dispatch(updateThemeInstructorImage(formData, schoolId)),
    getSchoolTheme: (schoolId) => dispatch(getTheme(schoolId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThemeUploads))