import React from 'react'
import AvailablePaymentMethodItem from './AvailablePaymentMethodItem'

const AvailablePaymentMethodContainer = ({ 
    paymentMethods
}) => {
    return <>
       <div className="available-payment-method-container">
        {
           paymentMethods.length === 0 ? <p>payment method not found</p> : <>
             {
                 paymentMethods.map((paymentMethod) => <AvailablePaymentMethodItem key={paymentMethod._id} item={paymentMethod} />)
             }
           </>
        }
       </div>
    </>
}

export default AvailablePaymentMethodContainer