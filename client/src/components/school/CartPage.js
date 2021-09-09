import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import PageNavbar from './PageNavbar'
import CartItem from './CartItem'

import '../../custom-styles/pages/cartpage.css'

export const CartPage = ({ match, cart }) => {

    const cartItemSum = cart?.reduce((prev, curr) => {
        return prev + curr.itemPrice
    },0)

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
                                    cart.map((cartItem) => <CartItem key={cartItem.itemId} cartItem={cartItem} />)
                                    }
                                </>
                            }
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="cart-summary mt-4 mb-3">
                           <div className="cart-subtotal">
                               <p>Subtotal:</p> <h4>${cartItemSum}</h4>
                           </div>
                           <div className="cart-tax">
                             <p>Tax:</p> <p>+1.8</p>
                           </div>
                           <div className="cart-total">
                             <p>Total</p> <p>{cartItemSum + 1.8}</p>
                           </div>
                           <Button className="checkout-btn" block>Checkout</Button>
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
