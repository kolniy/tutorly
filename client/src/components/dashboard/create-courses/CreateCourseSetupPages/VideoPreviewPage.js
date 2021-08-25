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
import axios from 'axios'
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
import setAuthToken from '../../../../utilities/setAuthToken'

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

    const [ commentDetails, setCommentDetails ] = useState(null)
    const [ comments, setComments] = useState([])
    const [ loadingComments, setLoadingComments ] = useState(true)
    const [ commentsPagination, setCommentsPagination ] = useState(1)
    const [ loadingMoreTextDisplay, setLoadingMoreTextDisplay ] = useState(false)
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

    // useEffect called to load courseunit comments
    useEffect(() => {
        if(unitDetails !== null){
            loadComments(match.params.videoId)
        }
    // eslint-disable-next-line
    }, [match.params.videoId])

    const loadComments = async (courseUnitId) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        const res = await axios.get(`/api/v1/comment/${courseUnitId}/?page=${commentsPagination}&size=3`)
        setCommentDetails(res.data)
        setComments(res.data.docs)
        setCommentsPagination(res.data.nextPage)
        setLoadingComments(false)
    }

    const loadMoreComments = async (courseUnitId) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        setLoadingMoreTextDisplay(true)
        const res = await axios.get(`/api/v1/comment/${courseUnitId}/?page=${commentsPagination}&size=3`)
        setCommentDetails(res.data)
        setComments([
            ...comments,
            ...res.data.docs
        ])
        setCommentsPagination(res.data.nextPage)
        setLoadingMoreTextDisplay(false)
    }

    const seeLessComments = async (courseUnitId) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        const res = await axios.get(`/api/v1/comment/${courseUnitId}/?page=1&size=3`)
        setCommentDetails(res.data)
        setComments(res.data.docs)
        setCommentsPagination(res.data.nextPage)
        setLoadingComments(false)
    }

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
                                    <Link to={`/dashboard/course/setup/module/${unitDetails?.course}`}>
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
                                    {
                                        loadingComments ? <div style={{
                                            width:'50%',
                                            margin:'20px auto',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}>
                                            <i style={{fontSize:'22px'}} className="fas fa-circle-notch fa-spin"></i>
                                        </div> : <>
                                            {
                                        comments.length === 0 ? 
                                        <p className="text-center lead mt-3 mb-3">No comments found</p> : <>
                                            {
                                                comments.map((comment) =>  <CommentsItem key={comment._id} comment={comment} />)
                                            }
                                        </>
                                    }
                                        </>
                                    }
                                    {
                                        loadingMoreTextDisplay && <p className="text-center lead">loading more...</p>
                                    }
                                    {
                                        commentDetails !== null && (<div className="comments-container__controls">
                                        <p className="comments-total-placeholder">{commentDetails.totalDocs} comments</p>
                                        {
                                            commentDetails.hasNextPage === true ? (<button onClick={e => loadMoreComments(unitDetails._id)} className="load-more-comments ml-5">
                                            <i className="fas fa-circle"></i> View More
                                          </button>) : ( <button onClick={e => seeLessComments(unitDetails._id)} className="load-more-comments ml-5">
                                          <i className="fas fa-circle"></i> See Less
                                        </button>)
                                        }
                                </div>)
                                    }
                                </div>
                                <div className="attachments-container">
                                    <h4 className="text-center mb-4">Course Unit Attachments</h4>
                                    <Row>
                                        {
                                            unitDetails.attachment.length === 0 ? <p className="text-center lead mt-3 mb-3">
                                                No Attachments for this course
                                            </p> : <>
                                                {
                                                unitDetails.attachment.map((item) => <AttachmentItem key={item._id} attachment={item} courseUnitId={unitDetails._id} />)
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
                                    <div className="edit-course-unit-name mb-4">
                                        <h4>Update course unit name</h4>
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
                                    </div>
                                    <div className="course-unit-video-edit mb-4">
                                     <h4>Replace course unit video</h4>
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
                                    </div>
                                   <div className="course-unit-attachment">
                                       <h4>Add Attachment to course unit</h4>
                                   <InputGroup>
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
