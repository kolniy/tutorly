import React from 'react'
import { Col } from 'reactstrap'
import AttachmentImage from "../../../../images/file-preview.png"

export const AttachmentItem = ({
    attachment
}) => {

    const openInNewTab = (url) => {
        window.open(url, '_blank').focus();
    }

    return <>
    <Col className="mb-2" xs="12" sm="3" md="4">
    <div onClick={e => openInNewTab(attachment.url)} className="attachment-item shadow">
    <img src={AttachmentImage}
        className="img-fluid"
        alt="attachment preview" 
        />
    </div>
    </Col>
    </>
}

export default AttachmentItem
