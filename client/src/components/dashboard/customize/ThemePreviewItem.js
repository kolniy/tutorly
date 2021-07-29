import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Button } from "reactstrap"

export const ThemeItem = ({ 
      themepreviewItem,
      openThemeChangeModal,
      school
     }) => {

    const showChangeThemeConfirmationDialog = (themepreviewId) => {
        openThemeChangeModal(themepreviewId)
    }
    
    return <>
    <Col className="mb-3" sm="4" md="4">
        <div className="theme-preview-item">
        <div className="theme-preview-overlay">
            <Button disabled={themepreviewItem?._id === school?.themepreviewid} size="large" className="ml-3 mt-3" onClick={e => showChangeThemeConfirmationDialog(themepreviewItem?._id)}>
                chooseTheme
            </Button>
            {
                themepreviewItem?._id === school?.themepreviewid && (
                <Button size="large" className="ml-3 mt-3" tag={Link} to="/dashboard/customize/theme/setup/themeinfo">
                    Update Settings
                </Button> 
                )
            }
        </div>
           <div className="theme-thumbnail-container">
               <img className="theme-previewer img-fluid" src={themepreviewItem?.thumbnail}  alt="theme-previewer" />
           </div>
        </div>
    </Col>   
    </>
}

const mapStateToProps = (state) => ({
    school : state.school.schoolDetails
})

export default connect(mapStateToProps)(ThemeItem)