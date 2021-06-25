import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { 
    Row,
    Col,
    Container
} from "reactstrap"
import { updateSchoolTheme } from "../../../actions/school"
import DashboardNavbar from "../DashboardNavbar"
import ThemeContainer from "./ThemeContainer"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/customize.css"

const Customize = ({ 
    updateSchoolThemeToSelectedTheme
}) => {

    const [ themes, setThemes ] = useState([])
    const [ selectedTheme, setSelectedTheme ] = useState(null)

    const selectTheme = (themeData) => {
        setSelectedTheme(themeData)
    }

    useEffect(() => {
        getThemes()
    }, [])

    useEffect(() => {
        if(selectedTheme !== null){
        updateSchoolThemeToSelectedTheme(selectedTheme._id)
        }
    }, [selectedTheme, updateSchoolThemeToSelectedTheme])

    const getThemes = async () => {
        const res = await axios.get('/api/v1/theme/')
        setThemes(res.data)
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
                        <ThemeContainer
                         themes={themes}
                         selectTheme={selectTheme} 
                         selectedTheme={selectedTheme} />
                  </div>
                </div>
                   </div>
                </Col>
            </Row>
        </Container>
    </div>
</>
}

const mapDispatchToProps = (dispatch) => ({
    updateSchoolThemeToSelectedTheme : (themeid) => dispatch(updateSchoolTheme(themeid))
})

export default connect(null, mapDispatchToProps)(Customize)