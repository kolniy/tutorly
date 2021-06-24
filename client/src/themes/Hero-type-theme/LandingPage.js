import React from 'react'
import HeroSection from "./HeroSetion"
import CourseList from "./CourseList"
import About from "./About"
import Contact from "./Contact"
import Footer from "./Footer"

import "./hero-theme-styles.css"

export const LandingPage = () => {
    return <>
        <HeroSection />
        <CourseList />
        <About />
        <Contact />
        <Footer />
    </>
}

export default LandingPage