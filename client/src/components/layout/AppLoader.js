import React from "react"
import { connect } from "react-redux"
import { Modal } from "reactstrap"

const Apploader = ({ loading }) => {
    return <>
        <Modal
           className="modal-dialog-centered"
           isOpen={loading}
         >
           <p className="lead text-center">Loading...</p>
         </Modal>
    </>
}

const mapStateToProps = (state) => ({
    loading: state.loading.isLoading
})

export default connect(mapStateToProps)(Apploader)