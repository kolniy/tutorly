import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap"
import { getTheme, updateThemeInfo } from "../../../../actions/theme"
import DashboardNavbar from '../../DashboardNavbar'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/customize.css"

export const ThemeInfo = ({
  getSchoolTheme,
  updateTheme,
  school,
  history,
  theme
}) => {

      const [ formData, setFormData ] = useState({
          heading: '',
          subheading:'',
          schoolname:'',
          schoolabout:''
      })

      const { heading, subheading, schoolname, schoolabout } = formData

      const updateFormFields = (e) => (
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
          })
      )

      const submitFormInfoHandler = (e) => {
        e.preventDefault()
        updateTheme(formData, school._id, history)
      }

      useEffect(() => {
        if(theme !== null){
          let themeHaeding = theme.themetitle !== null && theme.themetitle
          let themeSubTitle = theme.themesubtitle !== null && theme.themesubtitle
          let themeSchoolName = theme.themeschoolname !== null && theme.themeschoolname
          let themeAboutText = theme.abouttext !== null && theme.abouttext
          setFormData({
            heading: themeHaeding,
            subheading: themeSubTitle,
            schoolname: themeSchoolName,
            schoolabout: themeAboutText
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
                        <p className="page-subtitle">Fill in Your Landing Page Details</p>
                        <div className="theme-preview-container">
                           <div className="theme-setup">
                            <div className="form-container">
                            <Form onSubmit={e => submitFormInfoHandler(e)}>
                            <FormGroup>
                             <input
                               type="text"
                               className="form__input"
                               placeholder="Heading"
                               name="heading"
                               id="heading"
                               required
                               autoFocus
                               autoComplete="off"
                               onChange={e => updateFormFields(e)}
                               value={heading}
                               />
                            <label for="heading" className="form__label">Heading</label>
                            </FormGroup>
                            <FormGroup>
                             <input
                               type="text"
                               className="form__input"
                               placeholder="Sub Heading"
                               name="subheading"
                               id="subheading"
                               required
                               autoFocus
                               autoComplete="off"
                               onChange={e => updateFormFields(e)}
                               value={subheading}
                               />
                            <label for="subheading" className="form__label">Sub Heading</label>
                            <div className="instructions-tag">
                               e.g "A Traditional Australian Chef Masterclass"
                            </div>
                            </FormGroup>
                            <FormGroup>
                             <input
                               type="text"
                               className="form__input"
                               placeholder="Name of your school"
                               name="schoolname"
                               id="schoolname"
                               required
                               autoFocus
                               autoComplete="off"
                               value={schoolname}
                               onChange={e => updateFormFields(e)}
                               />
                            <label for="schoolname" className="form__label">Name of your school</label>
                            </FormGroup>
                            <FormGroup>
                             <Input
                             className="form__input"
                             placeholder="About School"
                             rows="5"
                             type="textarea"
                             name="schoolabout"
                             autoComplete="off"
                             value={schoolabout}
                             onChange={e => updateFormFields(e)}
                            />
                            </FormGroup>
                            <FormGroup className="mt-5">
                                <Button
                                className="customize-page-btn"
                                type="submit"
                                size="lg"
                                >
                                   Next
                                </Button>
                            </FormGroup>
                             </Form>
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
  updateTheme: (formData, schoolId, history) => dispatch(updateThemeInfo(formData, schoolId, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThemeInfo))
