import React, { useEffect, useState } from 'react'
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
import DashboardNavbar from '../../DashboardNavbar'
import VideoPlayer from './VideoPlayer'
import { loadCourseUnit } from '../../../../actions/courseunit'
import CommentsItem from './CommentsItem'
import AttachmentItem from './AttachmentItem'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/videounitpreview.css"

export const VideoPreviewPage = ({ match, courseunit: {
    loading,
    unitDetails
}, loadUnit }) => {

    const [ iconTabsSelect, updateIconTabsSelect ] = useState({
        iconTabs: 1,
        plainTabs: 1
    })

    const [ videoName, setVideoName ] = useState("")

    const toggleNavs = (e, name, value) => {
        e.preventDefault()
        updateIconTabsSelect({
            ...iconTabsSelect,
            [name]: value
        })
    }

    const editVideoNameHandler = (e) => setVideoName(e.target.value)

    useEffect(() => {
        loadUnit(match.params.videoId)
    }, [match.params.videoId, loadUnit])

    useEffect(() => {
        if(unitDetails){
        setVideoName(unitDetails.name)
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
                                <i className="fas fa-arrow-left"></i>
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
                                      <AttachmentItem />
                                      <AttachmentItem />
                                      <AttachmentItem />
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
                                        value={videoName}
                                        onChange={e => editVideoNameHandler(e)}
                                        ></Input>
                                        <InputGroupAddon addonType="append">
                                        <Button className="update-video-name-btn"
                                         type="button">
                                            Update Video Name
                                        </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </FormGroup>
                                    <div className="update-course-unit-video">
                                    </div>
                                    <InputGroup className="mt-4">
                                        <Input
                                        aria-describedby="button-addon4"
                                        aria-label="attachment filename"
                                        placeholder="attachment filename"
                                        type="text"
                                        ></Input>
                                        <InputGroupAddon addonType="append" id="button-addon4">
                                        <Button color="primary" className="attachment-btn-style" outline type="button">
                                            Pick File
                                        </Button>
                                        <Button color="primary" className="attachment-btn-style" outline type="button">
                                            Upload File
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
    courseunit: state.courseunit
})

const mapDispatchToProps = (dispatch) => ({
 loadUnit: (courseUnitId) => dispatch(loadCourseUnit(courseUnitId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreviewPage)
