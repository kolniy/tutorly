import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { removeAttachmentFromCourseUnit } from '../../../../actions/courseunit'
import { Col } from 'reactstrap'
import AttachmentImage from "../../../../images/file-preview.png"

export const AttachmentItem = ({
    attachment,
    courseUnitId,
    deleteAttachment
}) => {

    const [ showModal, setShowModal ] = useState(false)

    const openModalDialog = () => setShowModal(true)
    const closeModalDialog = () => setShowModal(false)

    const openInNewTab = (url) => {
        window.open(url, '_blank').focus();
    }

    const onDeleteAttachmentClickHandler = () => {
        deleteAttachment(courseUnitId, attachment._id)
        closeModalDialog()
    }

    return <>
    <Col className="mb-2" xs="12" sm="3" md="4">
    <div className="attachment-item shadow">
    <div onClick={openModalDialog} className="attachment-delete__btn">
    <i className="fas fa-times-circle"></i>
    </div>
    <img onClick={e => openInNewTab(attachment.url)} src={AttachmentImage}
        className="img-fluid"
        alt="attachment preview" 
        />
    </div>
    </Col>
    <Modal centered isOpen={showModal}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
            Delete Attachment
        </div>
        <ModalBody>
           Are You sure you want to delete this attachment ?
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} onClick={closeModalDialog}>Cancel</Button>{' '}
          <Button
          onClick={onDeleteAttachmentClickHandler}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Delete</Button>
        </ModalFooter>
      </Modal>
    </>
}

const mapDispatchToProps = (dispatch) => ({
    deleteAttachment: (courseUnitId, attachmentId) => dispatch(removeAttachmentFromCourseUnit(courseUnitId, attachmentId))
})

export default connect(null, mapDispatchToProps)(AttachmentItem)
