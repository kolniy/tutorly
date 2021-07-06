import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
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
import { updateSchoolTheme } from "../../../actions/school"
import DashboardNavbar from "../DashboardNavbar"
import ThemePreviewContainer from "./ThemePreviewContainer"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/customize.css"

const Customize = ({ 
    updateSchoolThemeToSelectedTheme
}) => {

    const [ showChangeThemeConfrimationModal, setShowChangeThemeConfrimationModal] = useState(false)
    const [ themePreview, setThemePreview ] = useState([])
    const [ selectedTheme, setSelectedTheme ] = useState(null)

    // const selectTheme = (themeData) => {
    //     setSelectedTheme(themeData)
    // }

    const closeThemeChangeModal = () => setShowChangeThemeConfrimationModal(false)
    const openThemeChangeModal = (themeId) => { 
        setShowChangeThemeConfrimationModal(true) 
        setSelectedTheme(themeId)
    }

    useEffect(() => {
        getThemePreviewList()
    }, [])

    const onUpdateThemeClickHandler = () => {
        // communicate with the backend
        console.log(selectedTheme)
        setShowChangeThemeConfrimationModal(false)
    }

    // useEffect(() => {
    //     if(selectedTheme !== null){
    //     updateSchoolThemeToSelectedTheme(selectedTheme._id)
    //     }
    // }, [selectedTheme, updateSchoolThemeToSelectedTheme])

    const getThemePreviewList = async () => {
        const res = await axios.get('/api/v1/themepreview/')
        setThemePreview(res.data)
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
                        <ThemePreviewContainer
                         themePreview={themePreview}
                         openThemeChangeModal={openThemeChangeModal}
                         />
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

const mapDispatchToProps = (dispatch) => ({
    updateSchoolThemeToSelectedTheme : (themeid) => dispatch(updateSchoolTheme(themeid))
})

export default connect(null, mapDispatchToProps)(Customize)