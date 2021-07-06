import React from 'react'
// import { connect } from "react-redux"
// import classnames from "classnames"
import { Col, Button } from "reactstrap"

export const ThemeItem = ({ 
      themepreviewItem,
      openThemeChangeModal
     }) => {
    
    // const chooseTheme = (data) => {
    //     selectTheme(data)
    // }

    // const previewTheme = () => {
    //    const newWindow = window.open(`http://localhost:3000/${school.name}`, "_blank", 'noopener,noreferrer')
    //    if(newWindow) newWindow.opener = null
    // }

    const showChangeThemeConfirmationDialog = (themepreviewId) => {
        openThemeChangeModal(themepreviewId)
    }
    
    return <>
    <Col className="mb-3" sm="4" md="4">
        <div className="theme-preview-item">
        <div className="theme-preview-overlay">
            <Button size="large" className="ml-3 mt-3" onClick={e => showChangeThemeConfirmationDialog(themepreviewItem._id)}>
                chooseTheme
            </Button>
        </div>
           <div className="theme-thumbnail-container">
               <img className="theme-previewer img-fluid" src={themepreviewItem.thumbnail}  alt="theme-previewer" />
           </div>
        </div>
    </Col>   
    </>
}

// const mapStateToProps = (state) => ({
//     school : state.school.schoolDetails
// })

export default ThemeItem