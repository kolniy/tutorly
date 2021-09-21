import React from 'react'

const AvailablePaymentMethodItem = ({
    item
}) => {
    return <>
        <div className="available-payment-method-item">
            <p className="available-payment-method-item__name">{item.name}</p>
            <img src={item.logourl} alt="payment processor gateway" className="img-fluid" />
            <div className="choose-payment-method__item">
               <i className="fas fa-plus"></i>
            </div>
        </div>
    </>
}

export default AvailablePaymentMethodItem