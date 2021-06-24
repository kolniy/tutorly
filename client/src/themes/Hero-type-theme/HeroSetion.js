import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Button,
    UncontrolledCollapse,
    Navbar,
    NavItem,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap"

export const HeroSetion = () => {
    return <>
        <section className="hero-section">
        <Navbar className="navbar-dark home-nav" expand="lg">
            <Container>
              <button className="navbar-toggler" id="navbar-primary">
                <i className="fas fa-bars hero-toggler-style"></i>
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-primary">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar-primary">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-lg-block">
                    <Button
                      tag={Link}
                      to="/sanowoodwork/login"
                      className="hero-section-button"
                    >
                      <span className="nav-link-inner--text ml-1">
                        login
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className="d-lg-block">
                    <Button
                      tag={Link}
                      to="/sanowoodwork/enroll"
                      className="hero-section-button"
                    >
                      <span className="nav-link-inner--text ml-1">
                        Enroll
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>

          <Container fluid className="hero-container-styles">
            <div className="hero-contents">
            <div className="hero-section-socail-links">
                   <Link className="social-icon-item">
                   <i class="fab fa-twitter"></i>
                   </Link>
                    <Link className="social-icon-item">
                    <i class="fab fa-youtube"></i>
                    </Link>
                    <Link className="social-icon-item">
                     <i class="fab fa-google"></i>
                    </Link>
                    <Link className="social-icon-item">
                    <i class="fab fa-instagram"></i>
                    </Link>
                    <Link className="social-icon-item">
                        <i class="fab fa-facebook"></i>
                    </Link>
            </div>
            <div className="hero-section-school-info">
                <h1 className="school-name">Sano's Wood Work</h1>
                <p className="school-subtitle">a complete carpentry masterclass</p>
                <Button className="hero-btn-enroll">Enroll</Button>
            </div>
            </div>
          </Container>

        </section>
    </>
}

export default HeroSetion
