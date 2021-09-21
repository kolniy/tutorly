import React from 'react'
import { Button } from 'reactstrap'

const SchoolPaymentMethodItem = ({
    item,
    updatePaymentMethodCheckState,
    onOpenUpdatePaymentMethodClick
}) => {

    const { logourl, active } = item

    const updateCheckedState = (e) => {
        updatePaymentMethodCheckState(item._id)
    }

    const paymentMethodToBeUpdateDetails = () => {
        const paymentItemObj = {
            id: item._id,
            logo: item.logourl,
            name: item.name
        }
        onOpenUpdatePaymentMethodClick(paymentItemObj)
    }

    return <>
         <div className="payment-method__item">
            <img src={logourl} className="img-fluid" alt="paystack logo" />
            <label class="switch">
                <input type="checkbox" checked={active} onChange={e => updateCheckedState(e)} />
                <div class="slider round">
                {/* <!--ADDED HTML --> */}
                <span class="on">Enabled</span>
                <span class="off">Disabled</span>
                {/* <!--END--> */}
                </div>
            </label>
            <Button onClick={paymentMethodToBeUpdateDetails}
            disabled={!active}
            className="payment-method__item-btn"
            >Enter Account Info</Button>
        </div>
    </>
}

export default SchoolPaymentMethodItem
