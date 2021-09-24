import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, 
    Button, ButtonDropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap'
import { PaystackButton } from 'react-paystack'
import PageNavbar from './PageNavbar'
import CartItem from './CartItem'

// function used to calculate actual cost/price if course has discount
import calculateDiscountForCourseCart from '../../utilities/calculateDiscountForCourseCart'

import '../../custom-styles/pages/cartpage.css'

export const CartPage = ({ match, cart }) => {

    const [ schoolPaymentMethods, setSchoolPaymentMethods ] = useState([])
    const [ validSchoolPaymentMethods, setValidSchoolPaymentMethods ] = useState([])
    const [ paymentMethodToUse, setPaymentMethodToUse ] = useState(null)
    const [dropdownOpen, setOpen] = useState(false); // used to control the checkout options dropdown
    const toggle = () => setOpen(!dropdownOpen);
    // const initializePaystackPayment = usePaystackPayment({
    //     reference: (new Date()).getTime().toString(),
    //     email: "kolaniyi3@gmail.com.com",
    //     amount: 2000 * 100,
    //     publicKey: 'pk_test_f0d4496ea386a402b4a3d72cda5e5535eb95d5cb',
    //   })

    const getSchoolPaymentMethods = async (schoolName) => {
        try {
            const res = await axios.get(`/api/v1/school/${schoolName}/check/paymentmethods`)
            setSchoolPaymentMethods(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // useEffect run to get all the payment methods for this school
        getSchoolPaymentMethods(match.params.schoolname)
    }, [match.params.schoolname])

    useEffect(() => {
    // filter applies here to get on valid payment methods
    setValidSchoolPaymentMethods(filterValidPayment(schoolPaymentMethods))
    }, [schoolPaymentMethods])

    useEffect(() => {
        if(validSchoolPaymentMethods.length > 0){
            setPaymentMethodToUse(validSchoolPaymentMethods[0])
        }
    }, [validSchoolPaymentMethods])

    const filterValidPayment = (paymentMethods) => {
        return paymentMethods.filter((method) => {
            return method.active === true && method.publickey.length > 0
        })
    }

    const updatePaymentMethodToUse = (method) => setPaymentMethodToUse(method)

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
        const percentDifference = (differenceInCost / actualCostWithoutDiscount) * 100
        return Math.round(percentDifference)
    }

    const checkOut = () => {
        // alert('hello') run function to check authentication status
        switch (paymentMethodToUse.name) {
            case 'paystack':
                // payStackPaymentHandler(paymentMethodToUse)
                break;
            case 'stripe':
                alert('call the stripe payment gateway method')
                break;
            default:
                break;
        }
    }

    const payStackHandleClose = () => alert('no')

    const payStackHandleSuccess = () => alert('yes')

    // const payStackPaymentHandler = (paymentMethodInfo) => {
        
    // }

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "kolaniyi3@example.com",
        amount: 20000,
        publicKey: paymentMethodToUse.publickey,
    }
    const componentProps = {
        ...config,
        onSuccess: (reference) => payStackHandleSuccess(reference),
        onClose: payStackHandleClose,
        text: 'Checkout With Paystack'
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
                           { validSchoolPaymentMethods.length === 0 ?
                            <p className="mt-2 mb-2" style={{color:'#fff'}}>Cannot check at the moment. school does not have a valid payment method</p> :
                            <ButtonDropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
                                {
                                    paymentMethodToUse.name === 'paystack' ? <>
                                        <PaystackButton {...componentProps} />
                                    </> : <>
                                    <Button onClick={checkOut} className="checkout-btn" id="caret">Checkout with {paymentMethodToUse?.name}</Button>
                                    </>
                                }
                            <DropdownToggle split style={{backgroundColor:'#569d6b', color:'#fff', border:'none'}} />
                            <DropdownMenu>
                            <DropdownItem header>Choose Different a payment method</DropdownItem>
                                {
                                    validSchoolPaymentMethods.map((method) => <DropdownItem onClick={e => updatePaymentMethodToUse(method)} key={method._id}>{method.name}</DropdownItem>)
                                }
                            </DropdownMenu>
                            </ButtonDropdown>}
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
