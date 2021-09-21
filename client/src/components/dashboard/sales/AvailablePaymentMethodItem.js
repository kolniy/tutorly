import React from 'react'
import { connect } from 'react-redux'
import { useAlert } from 'react-alert'

const AvailablePaymentMethodItem = ({
    item,
    addNewPaymentMethodToSchool,
    school,
    paymentMethods
}) => {

    const addPaymentMethodToSchool = () => {
        if(paymentMethods.find((method) => method._id === item._id) !== undefined){
           return alert.show('payment method already exist', {
                type:'error'
            })
        }  
        addNewPaymentMethodToSchool(item._id, school._id)
    }

    const alert = useAlert()

    return <>
        <div className="available-payment-method-item">
            <p className="available-payment-method-item__name">{item.name}</p>
            <img src={item.logourl} alt="payment processor gateway" className="img-fluid" />
            <div onClick={addPaymentMethodToSchool} className="choose-payment-method__item">
               <i className="fas fa-plus"></i>
            </div>
        </div>
    </>
}

const mapStateToProps = (state) => ({
    school: state.school.schoolDetails
})

export default connect(mapStateToProps)(AvailablePaymentMethodItem)