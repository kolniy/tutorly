import React from 'react'
import AvailablePaymentMethodItem from './AvailablePaymentMethodItem'

const AvailablePaymentMethodContainer = ({ 
    paymentMethods,
    addNewPaymentMethodToSchool
}) => {
    return <>
       <div className="available-payment-method-container">
        {
           paymentMethods.length === 0 ? <p>payment method not found</p> : <>
             {
                 paymentMethods.map((paymentMethod) => <AvailablePaymentMethodItem
                  key={paymentMethod._id} item={paymentMethod}
                  addNewPaymentMethodToSchool={addNewPaymentMethodToSchool}
                  paymentMethods={paymentMethods}
                  />)
             }
           </>
        }
       </div>
    </>
}

export default AvailablePaymentMethodContainer