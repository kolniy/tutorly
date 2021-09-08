import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import PageNavbar from './PageNavbar'
import CartItem from './CartItem'

import '../../custom-styles/pages/cartpage.css'

export const CartPage = ({ match, cart }) => {
    return <>
        <PageNavbar pageName={match.params.schoolname} />
        <div className="page-contents">
        <div className="cart-title">
            <Container fluid style={{
                width: '90%'
            }}>
            <h3>Shopping Cart</h3>
            </Container>
        </div>
        <div className="cart-container">
            <Container fluid style={{
                width:'90%'
            }}>
                <Row>
                    <Col md="9">
                        <div className="cart-list">
                            {
                                cart.length === 0 ? <p style={{
                                    color:'#fff',
                                    fontWeight:'400'
                                }}>You have no course in your cart. Click <Link to={`/${match.params.schoolname}`}>Here</Link> to See course and to cart</p> : <>
                                    {
                                    cart.map((cartItem) => <CartItem cartItem={cartItem} />)
                                    }
                                </>
                            }
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="cart-summary">
                            hii here
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </div>
    </>
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
