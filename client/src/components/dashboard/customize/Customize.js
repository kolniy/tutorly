import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { 
    Row,
    Col,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"
import DashboardNavbar from "../DashboardNavbar"
import ThemePreviewContainer from "./ThemePreviewContainer"
import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../../../actions/types"
import { chooseTheme } from "../../../actions/theme"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/customize.css"

const Customize = ({ 
    chooseNewTheme,
    school,
    history,
    updatePageSelector
}) => {

    const [ showChangeThemeConfrimationModal, setShowChangeThemeConfrimationModal] = useState(false)
    const [ themePreview, setThemePreview ] = useState([])
    const [ selectedTheme, setSelectedTheme ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const closeThemeChangeModal = () => setShowChangeThemeConfrimationModal(false)
    const openThemeChangeModal = (themeId) => { 
        setShowChangeThemeConfrimationModal(true) 
        setSelectedTheme(themeId)
    }

    useEffect(() => {
        getThemePreviewList()
    }, [])

    useEffect(() => {
        updatePageSelector(1)
        // eslint-disable-next-line
    }, [])

    const onUpdateThemeClickHandler = () => {
        chooseNewTheme(school._id, selectedTheme, history)
        setShowChangeThemeConfrimationModal(false)
    }

    const getThemePreviewList = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/v1/themepreview/')
            setThemePreview(res.data)
        } catch (error) {
            setThemePreview([])
        }
        setLoading(false)
    }

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
                        <p className="page-subtitle">Select a Landing Page Style</p>
                            {
                                loading ? <p className="text-center lead">Loading...</p> : <>
                                   <ThemePreviewContainer
                                   themePreview={themePreview}
                                    openThemeChangeModal={openThemeChangeModal}
                                    />
                                </>
                            }  
                  </div>
                </div>
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
    <Modal isOpen={showChangeThemeConfrimationModal} toggle={closeThemeChangeModal}>
        <ModalHeader className="text-dark" toggle={closeThemeChangeModal}>Confirm Change</ModalHeader>
        <ModalBody className="text-dark">
        Are You Sure you want to Change your Theme?
        </ModalBody>
        <ModalFooter>
          <Button onClick={e => onUpdateThemeClickHandler()} className="customize-modal-btn">Update Theme</Button>{' '}
          <Button color="secondary" onClick={closeThemeChangeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
</>
}

const mapStateToProps = (state) => ({
    school: state.school.schoolDetails
})

const mapDispatchToProps = (dispatch) => ({
   chooseNewTheme : (schoolId, themePreviewId, history) => dispatch(chooseTheme(schoolId, themePreviewId, history)),
  updatePageSelector: (counter) => dispatch({type: UPDATE_DASHBOARD_PAGE_COUNTER, payload:counter })
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Customize))