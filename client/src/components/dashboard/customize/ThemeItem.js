import React from 'react'
import { connect } from "react-redux"
import classnames from "classnames"
import { Col, Button } from "reactstrap"

export const ThemeItem = ({ theme,
     selectTheme,
      selectedTheme, 
      school
     }) => {

    const chooseTheme = (data) => {
        selectTheme(data)
    }

    const previewTheme = () => {
       const newWindow = window.open(`http://localhost:3000/${school.name}`, "_blank", 'noopener,noreferrer')
       if(newWindow) newWindow.opener = null
    }

    return <>
    <Col className="mb-3" sm="6" md="6">
        <div onClick={e => chooseTheme(theme)} className="theme-item">
            {
              selectedTheme !== null && selectedTheme._id === theme._id && <div className="theme-item-previewer">
                  <Button className="theme-item-btn-previewer" size="large" onClick={e => previewTheme()}>Preview Theme</Button>
              </div>
            }
            <div className="theme-select-indicator-container">
            <div className={classnames("theme-select-indicator", {
                "theme-indicator-selected" : selectedTheme !== null && selectedTheme._id === theme._id
            })}></div>
            </div>
           <div className="theme-preview-container">
               <img className="theme-previewer img-fluid" src={theme.imagepreview}  alt="theme-previewer" />
           </div>
        </div>
        <p className="theme-name">{ theme.name }</p>
    </Col>   
    </>
}

const mapStateToProps = (state) => ({
    school : state.school.schoolDetails
})

export default connect(mapStateToProps)(ThemeItem)