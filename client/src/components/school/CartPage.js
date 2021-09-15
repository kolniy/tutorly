import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import PageNavbar from './PageNavbar'
import CartItem from './CartItem'
// function used to calculate actual cost/price if course has discount
import calculateDiscountForCourseCart from '../../utilities/calculateDiscountForCourseCart'

import '../../custom-styles/pages/cartpage.css'

export const CartPage = ({ match, cart }) => {

    const cartItemSumWithDiscount = cart?.reduce((prev, curr) => {
        if(curr.itemDiscount){
            return prev + calculateDiscountForCourseCart(curr.itemPrice, curr.itemDiscount)
        } else {
        return prev + curr.itemPrice
        }
    },0)

    const actualCostWithoutDiscount = cart?.reduce((prev, curr) => {
        return prev + curr.itemPrice
    }, 0)

    const getCourseTotalSavingFromDiscount = () => {
        return actualCostWithoutDiscount - cartItemSumWithDiscount
    }

    const calculateSavingsInPercentage = () => {
        const differenceInCost = actualCostWithoutDiscount - cartItemSumWithDiscount
        const averageInCost = (actualCostWithoutDiscount + cartItemSumWithDiscount) / 2
        const averageSavingsInPrecent = (differenceInCost / averageInCost) * 100
        return Math.round(averageSavingsInPrecent)
    }


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
                    <Col className="cart-sum" md="3">
                        <div className="cart-summary mt-4 mb-3">
                           <div className="cart-subtotal">
                               <p>Subtotal:</p> <h4><span className="actual-price-span">${actualCostWithoutDiscount}</span>${cartItemSumWithDiscount}</h4>
                           </div>
                           <div className="cart-tax">
                             <p>Total Savings(%{calculateSavingsInPercentage()}):</p> <p>${getCourseTotalSavingFromDiscount()}</p>
                           </div>
                           <div className="cart-total">
                             <p>Total</p> <p>{cartItemSumWithDiscount}</p>
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
