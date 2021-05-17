import React from 'react'
import { Link } from "react-router-dom"
import {
    Button,
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap"

const HomepageNavbar = props => {
    return <>
         <Navbar className="navbar-dark home-nav" expand="lg">
            <Container>
              <NavbarBrand tag={Link} to="/">
                Tutorly
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-primary">
                <i className="fas fa-bars toggler-style"></i>
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-primary">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                          Tutorly
                      </Link>
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
                      to="/signin"
                      className="btn-login"
                    >
                      <span className="nav-link-inner--text ml-1">
                        login
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className="d-lg-block">
                    <Button
                      tag={Link}
                      to="/signup"
                      className="btn-signup"
                    >
                      <span className="nav-link-inner--text ml-1">
                        sign up
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
    </>
}

export default HomepageNavbar
