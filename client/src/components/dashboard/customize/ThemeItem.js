import React from 'react'
import classnames from "classnames"
import { Col } from "reactstrap"

export const ThemeItem = ({ theme, selectTheme, selectedTheme }) => {

    const chooseTheme = (data) => {
        selectTheme(data)
    }

    return <>
    <Col className="mb-3" sm="6" md="6">
        <div onClick={e => chooseTheme(theme)} className="theme-item">
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

export default ThemeItem