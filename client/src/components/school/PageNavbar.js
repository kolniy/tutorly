import React from 'react'
import { connect } from 'react-redux'
import { 
  Navbar, Container, UncontrolledCollapse,
    Row, Col, Nav, NavItem, Button, Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'

import '../../custom-styles/pages/pagenavbar.css'

const PageNavbar = ({ pageName, cart }) => {
    return <>
         <Navbar className="navbar-dark page-navbar" expand="lg">
            <Container>
              <button className="navbar-toggler" id="navbar-primary">
                <i className="fas fa-bars"></i>
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
                      to={`/${pageName}/login`}
                      className="page-navbar-button"
                    >
                      <span className="nav-link-inner--text ml-1">
                        Messages
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className="d-lg-block">
                    <Button
                      tag={Link}
                      to={`/${pageName}/login`}
                      className="page-navbar-button"
                    >
                      <span className="nav-link-inner--text ml-1">
                        Enroll
                      </span>
                    </Button>
                  </NavItem>
                  {
                    cart.length > 0 && (
                      <NavItem className="d-lg-block">
                    <Button
                      tag={Link}
                      to={`/${pageName}/cart`}
                      className="page-navbar-button"
                    >
                      <span className="nav-link-inner--text ml-1">
                        Cart <Badge>{cart.length}</Badge>
                      </span>
                    </Button>
                  </NavItem>
                    )
                  }
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
    </>
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps)(PageNavbar)