import React from 'react'
import { Row } from "reactstrap"

import ThemeItem from "./ThemeItem"

export const ThemeContainer = ({ themes, selectTheme, selectedTheme }) => {
    return <>
        <div className="theme-container">
            <Row>
                {
                    themes.length === 0 ? <>
                        <p className="text-center lead">No Theme To Display At This Time.</p>
                    </> : <>
                        {
                            themes.map((theme) => <ThemeItem key={theme._id}
                             selectTheme={selectTheme}
                             selectedTheme={selectedTheme}
                             theme={theme} />)
                        }
                    </>
                }
            </Row>
        </div>
    </>
}

export default ThemeContainer