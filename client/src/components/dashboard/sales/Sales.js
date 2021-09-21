import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from "react-redux"
import { 
    Row,
    Col,
    Container,
    Button,
    Modal,
    ModalBody,
    ModalFooter
} from "reactstrap"
import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../../../actions/types"
import { startLoading, stopLoading } from "../../../actions/appLoading"
import DashboardNavbar from "../DashboardNavbar"
import setAuthToken from "../../../utilities/setAuthToken"
import Barchat from "./Barchat"
import AvailablePaymentMethodContainer from './AvailablePaymentMethodContainer'
import SchoolPaymentMethodItem from './SchoolPaymentMethodItem'

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/sales.css"

const Sales = ({ 
    updatePageSelector,
    school,
    showLoader,
    removeLoader
}) => {

    const [ newPaymentMethodModalOpen, setNewPaymentMethodModalOpen ] = useState(false)
    const [ listOfSupportedPaymentMethods, setListOfSupportedPaymentMethods ] = useState([])
    const [ listOfSchoolPaymentMethods, setListOfSchoolPaymentMethods ] = useState([])
    const [ loadingListOfSchoolPaymentMethods, setLoadingListOfSchoolPaymentMethods ] = useState(true)
    const [ showUpdatePaymentMethodKeys, setShowUpdatePaymentMethodKeys ] = useState(false)
    const [ detailsOfPaymentMethodToBeUpdated, setDetailsOfPaymentMethodToBeUpdated ] = useState(null)

    const onOpenUpdatePaymentMethodClick = (paymentMethodDetails) => {
        setShowUpdatePaymentMethodKeys(true)
        setDetailsOfPaymentMethodToBeUpdated(paymentMethodDetails)
    }

     const onCloseUpdatePaymentMethodClick = () => {
        setShowUpdatePaymentMethodKeys(false)
        setDetailsOfPaymentMethodToBeUpdated(null)
     }

    const getListOfSupportedPaymentMethods = async () => {
        try {
            if(localStorage.getItem('token')){
                setAuthToken(localStorage.getItem('token'))
            }
            const res = await axios.get('/api/v1/availablepaymentmethod')
            setListOfSupportedPaymentMethods((await res).data)
        } catch (error) {
            console.log(error)
        }
    }

    const getListOfSchoolPaymentMethods = async (schoolId) => {
        try {
            if(localStorage.getItem('token')){
                setAuthToken(localStorage.getItem('token'))
            }
            const res = await axios.get(`/api/v1/schoolpaymentmethod/${schoolId}`)
            setListOfSchoolPaymentMethods(res.data)
            setLoadingListOfSchoolPaymentMethods(false)
        } catch (error) {
            setLoadingListOfSchoolPaymentMethods(false)
            console.log(error)
        }
    }

    const addNewPaymentMethodToSchool = async (paymentMethodId, schoolId) => {
        try {
            if(localStorage.getItem('token')){
                setAuthToken(localStorage.getItem('token'))
            }
            showLoader()
            const res = await axios.post(`/api/v1/schoolpaymentmethod/${paymentMethodId}/${schoolId}`)
            setListOfSchoolPaymentMethods([
                ...listOfSchoolPaymentMethods,
                res.data
            ])
            removeLoader()
            setNewPaymentMethodModalOpen(false)
        } catch (error) {
            removeLoader()
            console.log(error)
        }
    }

    const updatePaymentMethodCheckState = async (paymentMethodId) => {
        try {
            if(localStorage.getItem('token')){
                setAuthToken(localStorage.getItem('token'))
            }
            showLoader()
            const res = await axios.put(`/api/v1/schoolpaymentmethod/check/${paymentMethodId}`)
            setListOfSchoolPaymentMethods(listOfSchoolPaymentMethods.map((item) => {
                if(item._id === res.data._id){
                    return {
                        ...item,
                        ...res.data
                    }
                } else {
                    return item
                }
            }))
            removeLoader()
        } catch (error) {
            removeLoader()
            console.log(error)
        }
    }

    useEffect(() => {
        getListOfSupportedPaymentMethods() // get list of payment methods that the tutor can choose from        
    }, [])

    useEffect(() => {
       if(school !== null){
        getListOfSchoolPaymentMethods(school._id) // get list of payment methods that the tutor has already choose for he's school
       }
    }, [school])

    useEffect(() => {
        updatePageSelector(4)
        // eslint-disable-next-line
    }, [])

    return <>
    <div className="dashboard-layout">
        <Container fluid>
            <Row>
               <DashboardNavbar />
             <Col>
                   <div className="page-actions">

                        <div className="payment-setup__contents">
                        <div className="section-header">
                            <h5>Payment Method</h5>
                            <div onClick={e => setNewPaymentMethodModalOpen(true)} className="add-payment__method mr-1">
                              <i className="fas fa-plus"></i>
                            </div>
                        </div>
                        <div className="payment-method-list">
                            {
                              loadingListOfSchoolPaymentMethods ?
                                (<div style={{
                                    width:'50%',
                                    margin:'20px auto',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <i className="fas fa-circle-notch fa-spin"></i>
                                </div>) :
                                <>
                                    {
                                        listOfSchoolPaymentMethods.length === 0 ? <p className="text-center">
                                            your school currently has not payment method.
                                        </p> : <>
                                            {
                                                listOfSchoolPaymentMethods.map((item) => <SchoolPaymentMethodItem
                                                 key={item._id} item={item}
                                                 updatePaymentMethodCheckState={updatePaymentMethodCheckState}
                                                 onOpenUpdatePaymentMethodClick={onOpenUpdatePaymentMethodClick}
                                                  />)
                                            }
                                        </>
                                    }
                                </>
                            }
                        </div>
                        </div>
                        
                     <div className="sales-page__contents">
                        <div className="section-header">
                            <h5>Payment History</h5>
                        </div>
                         <div className="payment-history__container">
                            <Container>
                                <Row>
                                    <Col sm="12" md="12" lg="7">
                                  <div className="chart-container">
                                    <Barchat />
                                 </div>
                                    </Col>
                                    <Col sm="12" md="12" lg="5">
                                    <div className="sales-breakdown__info ml-2">
                           <div className="total-sales-info_container">
                                <p className="total-sales_info">Total Sales</p>
                                <h1>$11099.00</h1>
                            </div>
                            <div className="monthly-sale-info_container">
                                <p className="monthly-sale_info">
                                    Sales this Month
                                </p>
                                <h1>$599.00</h1>
                            </div>
                           </div>
                           <div className="subscription-info">
                                <p className="subscription-info-text">Subscription Price/Candidate</p>
                                <div className="subscription-actions">
                                    <div className="subscription-cost-container">
                                        $99.00
                                    </div>
                                    <Button color="default" className="subscription-accept-button">
                                        Accept
                                    </Button>
                                </div>
                              </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                          </div>
                        </div>
             </Col>
            </Row>
        </Container>
    </div>
    <Modal size="md" isOpen={newPaymentMethodModalOpen}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
            Choose a new Payment Method
        </div>
        <ModalBody>
        <AvailablePaymentMethodContainer paymentMethods={listOfSupportedPaymentMethods} addNewPaymentMethodToSchool={addNewPaymentMethodToSchool} />
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} 
          onClick={e => setNewPaymentMethodModalOpen(false)}
          >Cancel</Button>{' '}
          <Button
          onClick={e => setNewPaymentMethodModalOpen(false)}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Close</Button>
        </ModalFooter>
      </Modal>
      <Modal size="md" isOpen={showUpdatePaymentMethodKeys}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
            {
            detailsOfPaymentMethodToBeUpdated !== null && (<img src={detailsOfPaymentMethodToBeUpdated?.logo} alt="payment gateway logo" className="img-fluid" />)
            }
        </div>
        <ModalBody>
        {
            detailsOfPaymentMethodToBeUpdated !== null && (<p>Enter your {detailsOfPaymentMethodToBeUpdated.name} Account Information here to enable integration</p>)
        }
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} 
          onClick={onCloseUpdatePaymentMethodClick}
          >Cancel</Button>{' '}
          <Button
        //   onClick={e => setNewPaymentMethodModalOpen(false)}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Update</Button>
        </ModalFooter>
      </Modal>
</>
}

const mapStateToProps = (state) => ({
    school: state.school.schoolDetails
})

const mapDispatchToProps = (dispatch) => ({
  updatePageSelector: (counter) => dispatch({type: UPDATE_DASHBOARD_PAGE_COUNTER, payload:counter }),
  showLoader: () => dispatch(startLoading()),
  removeLoader: () => dispatch(stopLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sales)