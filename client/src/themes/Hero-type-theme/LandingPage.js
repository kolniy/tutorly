import React from 'react'
import HeroSection from "./HeroSetion"
import CourseList from "./CourseList"
import About from "./About"
import Contact from "./Contact"
import Footer from "./Footer"

import "./hero-theme-styles.css"

export const LandingPage = ({ themeData }) => {
    return <>
        <HeroSection themeData={themeData} />
        <CourseList themeData={themeData} />
        <About themeData={themeData} />
        <Contact themeData={themeData} />
        <Footer themeData={themeData} />
    </>
}

export default LandingPage