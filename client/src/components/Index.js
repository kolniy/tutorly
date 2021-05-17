import React from 'react'
import { Link } from 'react-router-dom'
import HomepageNavbar from "./layout/HomepageNavbar"
import landingPageImage from "../images/landing-page-image.jpg"

import "../../src/custom-styles/index.css"

export const Index = () => {
    return <>
    <section className="home-hero-section">
        <HomepageNavbar />
        <div className="overlay-green-background">
        </div>
        <div className="hero-page-intro">
            <div className="horizontal-bar"></div>
            <p className="intro-header">Become a tutor online</p>
            <p className="intro-text">Become a Tutor and create a space with Tuturly
                Home for Tutors to share classes and hold live webinars
            </p>
        </div>
        <div className="hero-callToAction">
            <div className="cta-image-container">
                <img src={landingPageImage} 
                  className="img-fluid"
                alt="landing page illustration" />
            </div>
            <div className="cta-action-description">
                <p className="cta-title">Sign Up</p>
                <p className="cta-subtitle">With <span className="subtitle-sitename">tuturly</span></p>
                <p className="cta-description">own your own domain, and personalize to your taste</p>
                    <br />
                <Link className="cta-link" to="/signup">
                    Get Started
                </Link>
            </div>
        </div>
    </section>
    </>
}

export default Index
