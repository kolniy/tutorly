import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Row, Col,
     Container, Nav,
    NavItem, NavLink, 
    Card, CardBody,
    TabContent, TabPane,
    FormGroup, Input,
    InputGroup, InputGroupAddon,
    Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import DashboardNavbar from '../../DashboardNavbar'
import VideoPlayer from './VideoPlayer'
import { loadCourseUnit,
     updateCourseUnitName,
     updateCourseUnitVideo, 
    addAttachmentToCourseUnit
    } from '../../../../actions/courseunit'
import CommentsItem from './CommentsItem'
import AttachmentItem from './AttachmentItem'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/videounitpreview.css"

export const VideoPreviewPage = ({ match, courseunit: {
    loading,
    unitDetails,
},
course,
loadUnit,
updateUnitName,
updateUnitVideo,
addAttachment
}) => {

    const [ iconTabsSelect, updateIconTabsSelect ] = useState({
        iconTabs: 1,
        plainTabs: 1
    })

    const [ videoName, setVideoName ] = useState({
        name: ""
    })

    const [ attachmentFile, setAttachmentFile ] = useState(null)
    const attachmentRef = useRef()
    const videoInputRef = useRef()
    const customAlert = useAlert()

    const handleAttachmentFileChange = () => attachmentRef.current.click()
    const updateVideo = () => videoInputRef.current.click()

    const toggleNavs = (e, name, value) => {
        e.preventDefault()
        updateIconTabsSelect({
            ...iconTabsSelect,
            [name]: value
        })
    }

    const editVideoNameHandler = (e) => setVideoName({
        name: e.target.value
    })

    const onAttachmentFileUpdate = (e) => {
        if(e.target.files.length === 0){
            setAttachmentFile(null)
          }
          setAttachmentFile(e.target.files[0])
    }

    const submitVideoNameUpdates = () => {  
        if(videoName.name.length === 0){
            return customAlert.show('video name cannot be empty', {
                type:'error'
            })
        }
        updateUnitName(videoName, unitDetails._id)
    }

    const submitNewAttachment = () => {
        const formData = new FormData()
        formData.append('attachment', attachmentFile)
        addAttachment(formData, unitDetails._id)
        setAttachmentFile(null)
    }

    const onVideoUpdateClickHandler = (e) => {
        const formData = new FormData()
        formData.append('videofile', e.target.files[0])

        updateUnitVideo(formData, unitDetails.course, unitDetails._id)
    }

    useEffect(() => {
        loadUnit(match.params.videoId)
    }, [match.params.videoId, loadUnit])

    useEffect(() => {
        if(unitDetails){
        setVideoName({
            name: unitDetails.name
        })
        }
    }, [unitDetails])

    return <>
        <div className="dashboard-layout">
            <Container fluid>
                <Row>
                    <DashboardNavbar />
                    <Col>
                    <div className="page-actions">
                   {
                   loading === true &&
                    unitDetails === null ?
                     <p className="text-center lead">loading...</p> : 
                     <>
                        <div className="video-preview-container shadow">
                            <div className="video-preview-page-controls">
                                <div className="previous-page-arrow">
                                    <Link to={`/dashboard/course/setup/module/${course._id}`}>
                                     <i className="fas fa-arrow-left"></i>
                                    </Link>
                                </div>
                            <div className="nav-wrapper">
                            <Nav
                                className="nav-fill flex-column flex-md-row"
                                id="tabs-icons-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                <NavLink
                                    aria-selected={iconTabsSelect.iconTabs === 1}
                                    className={`mb-sm-3 mb-md-0 ${iconTabsSelect.iconTabs === 1 && 'active'}`}
                                    onClick={e => toggleNavs(e, "iconTabs", 1)}
                                    role="tab"
                                >
                                    Preview
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    aria-selected={iconTabsSelect.iconTabs === 2}
                                    className={`mb-sm-3 mb-md-0 ${iconTabsSelect.iconTabs === 2 && 'active'}`}
                                    onClick={e => toggleNavs(e, "iconTabs", 2)}
                                    role="tab"
                                >
                                    Edit
                                </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                     </div>
                    <div className="tab-contents">
                        <Card>
                        <CardBody>
                            <TabContent activeTab={"iconTabs" + iconTabsSelect.iconTabs}>
                            <TabPane tabId="iconTabs1">
                                <p className="text-center page-title">Preview Video Content</p>
                                <h2 className="text-center video-name">{unitDetails.name}</h2>
                                <VideoPlayer  />
                                <div className="comments-container">
                                    <CommentsItem />
                                    <CommentsItem />
                                    <CommentsItem />
                                </div>
                                <div className="attachments-container">
                                    <h4 className="text-center mb-4">Course Unit Attachments</h4>
                                    <Row>
                                        {
                                            unitDetails.attachment.length === 0 ? <p className="text-center lead mt-3 mb-3">
                                                No Attachments for this course
                                            </p> : <>
                                                {
                                                unitDetails.attachment.map((item) => <AttachmentItem key={item._id} attachment={item} />)
                                                }
                                            </>
                                        }
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tabId="iconTabs2">
                            <p className="text-center page-title">Edit Video Content</p>
                                <h2 className="text-center video-name">{unitDetails.name}</h2>
                                <div className="edits-controls-container">
                                    <FormGroup>
                                    <InputGroup>
                                        <Input
                                        aria-label="Edit video name"
                                        placeholder="Edit video name"
                                        type="text"
                                        value={videoName.name}
                                        onChange={e => editVideoNameHandler(e)}
                                        ></Input>
                                        <InputGroupAddon addonType="append">
                                        <Button disabled={unitDetails.name === videoName.name} onClick={submitVideoNameUpdates} className="update-video-name-btn"
                                         type="button">
                                            Update Video Name
                                        </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </FormGroup>
                                    <div className="update-course-unit-video">
                                        <div onClick={updateVideo} className="update-course-unit-video-btn">
                                            <input
                                             ref={videoInputRef}
                                             type="file"
                                             onChange={e => onVideoUpdateClickHandler(e)}
                                             style={{
                                                 display:'none'
                                             }}
                                            />
                                         <i className="fas fa-upload"></i>
                                         <p className="text-center mt-3">Click to Upload Video</p>
                                        </div>
                                    </div>
                                    <InputGroup className="mt-4">
                                        <Input
                                        aria-describedby="button-addon4"
                                        aria-label="attachment filename"
                                        placeholder="attachment filename"
                                        type="text"
                                        value={attachmentFile !== null ? attachmentFile.name : ''}
                                        ></Input>
                                        <input
                                         type="file"
                                         ref={attachmentRef}
                                         style={{ display:'none'}}
                                         onChange={e => onAttachmentFileUpdate(e)}
                                        />
                                        <InputGroupAddon addonType="append" id="button-addon4">
                                        <Button onClick={handleAttachmentFileChange} color="primary" className="attachment-btn-style" outline type="button">
                                            Pick File
                                        </Button>
                                        <Button
                                         onClick={submitNewAttachment}
                                         disabled={attachmentFile === null} 
                                         color="primary" className="attachment-btn-style" outline type="button">
                                            Upload Attachment
                                        </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </TabPane>
                            </TabContent>
                        </CardBody>
                        </Card>
                    </div>
                   </div>
                     </>
                   } 
                   </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

const mapStateToProps = (state) => ({
    courseunit: state.courseunit,
    course: state.course.courseDetails
})

const mapDispatchToProps = (dispatch) => ({
 loadUnit: (courseUnitId) => dispatch(loadCourseUnit(courseUnitId)),
 updateUnitName: (updates, courseUnitId) => dispatch(updateCourseUnitName(updates, courseUnitId)),
 updateUnitVideo: (videoFile, courseId, courseUnitId) => dispatch(updateCourseUnitVideo(videoFile, courseId,courseUnitId)),
 addAttachment: (attachmentFile, courseUnitId) => dispatch(addAttachmentToCourseUnit(attachmentFile, courseUnitId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreviewPage)
