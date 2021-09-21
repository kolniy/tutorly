import React from 'react'
import { Button } from 'reactstrap'

const SchoolPaymentMethodItem = ({
    item
}) => {

    const { logourl } = item
    // active

    return <>
         <div className="payment-method__item">
            <img src={logourl} className="img-fluid" alt="paystack logo" />
            <label class="switch">
                <input type="checkbox" id="togBtn" />
                <div class="slider round">
                {/* <!--ADDED HTML --> */}
                <span class="on">Enabled</span>
                <span class="off">Disabled</span>
                {/* <!--END--> */}
                </div>
            </label>
            <Button className="payment-method__item-btn"
            >Enter Account Info</Button>
        </div>
    </>
}

export default SchoolPaymentMethodItem
