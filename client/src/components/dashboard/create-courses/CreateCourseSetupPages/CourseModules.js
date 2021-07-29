import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import setAuthToken from '../../../../utilities/setAuthToken'
import { 
    Container, 
    Row, 
    Col, 
    Modal,
    Button,
    FormGroup,
    Input
} from "reactstrap"
import { useAlert } from "react-alert"
import DashboardNavbar from '../../DashboardNavbar'
import { getCourseById } from "../../../../actions/course"
import AddNewModule from './AddNewModule' 
import CourseModuleItem from './CourseModuleItem'
import { startLoading, stopLoading } from "../../../../actions/appLoading"
import VideoUploadModal from './VideoUploadModal'

import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/coursemodule.css"

export const CreateCourseModules = ({
    getCourse,
    course,
    match,
    displayLoader,
    removeLoader
}) => {

    const [ modules, setModules ] = useState([])
    const [ modluesLoading, setModulesLoading ] = useState(true)
    const [ launchAddModuleModal, setLaunchAddModuleModal ] = useState(false)
    const [ launchAddVideoModal, setLaunchAddVideoModal ] = useState(false)
    const [ moduleIdForVideoUpload, setModuleIdForVideoUpload ] = useState(null)
    const [ videoFile, setVideoFile ] = useState(null)
    const [ videoFileToCloudinary, setVideoFileToCloudinary ] = useState(null)
    const [ uploadedVideoInfo, setUploadedVideoInfo ] = useState({
        videoUrl: '',
        videoPublicId: ''
    })
    const [ videoUploadDialog, setVideoUploadDialog ] = useState(false)
    const [ loaded, setLoaded ] = useState(0)
    const alert = useAlert()
    const [ newModuleName, setNewModuleName ] = useState({
        name:""
    })
    const videoFileInputRef = useRef()
    const [ newLessonName, setNewLessonName ] = useState("")
    
    const openModuleModal = () => setLaunchAddModuleModal(true)
    const closeModuleModal = () => setLaunchAddModuleModal(false)

    const openVideoUploadDialog = () => setVideoUploadDialog(true)
    const closeVideoUploadDialog = () => setVideoUploadDialog(false)

    const openVideoModal = (moduleId) => {
        setLaunchAddVideoModal(true)
        setModuleIdForVideoUpload(moduleId)
    }
    const closeVideoModal = () => {
        setLaunchAddVideoModal(false)
        setModuleIdForVideoUpload(null)
    }

    const updateModuleNameFromInput = (e) => setNewModuleName({
        ...newModuleName,
          name: e.target.value
    })

    const videoLessonFilePickerHandler = (e) => {
        if(e.target.files.length === 0){
            setVideoFile(null)
          }
          setVideoFile(e.target.files[0])
          const reader = new FileReader()
          reader.addEventListener('load', function(){
            setVideoFileToCloudinary(reader.result)
          }, false)

          if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const buttonFilePickerEventHandler = () => videoFileInputRef.current.click()

    const updateVideoLessonTitle = (e) => setNewLessonName(e.target.value)

    const addModule = async () => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify(newModuleName)
        displayLoader()
        try {
          const res = await axios.post(`/api/v1/coursechapter/${course._id}`, body, config)
           setModules([
               ...modules,
               res.data
           ])
        removeLoader()
        } catch (error) {
            removeLoader()
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert.show(element.msg, {
                        type:"error"
                    })
                });
            }
        }
    }

    const addModuleToCourse = () => {
        if(newModuleName.name.length === 0){
            return alert.show("module name cannot be empty", {
                type: "error"
            })
        }
        addModule()
        closeModuleModal(false)
    }

    const saveVideo = () => {
        if(newLessonName.length === 0){
            return alert.show("lesson name cannot be empty", {
                type: "error"
            })
        }
        // try {
        //     // post data to backend
        //     setUploadedVideoInfo({
        //         ...uploadedVideoInfo,
        //         videoUrl: '',
        //         videoPublicId: ''
        //     })
            console.log(moduleIdForVideoUpload)
        // } catch (error) {
            
        // }
    }

    const uploadVideo = async () => {

        const cloudinaryCloudName = 'kolaniyi'
        const CloudinaryUploadPreset = 'f17zv7io'
        const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`

        const form  = new FormData()
        form.append("upload_preset", CloudinaryUploadPreset)
        form.append("file", videoFileToCloudinary)

        const config = {
            onUploadProgress: (event) => {
                setLoaded(event.loaded / event.total * 100)
            }
        }

        try {
        delete axios.defaults.headers.common["x-auth-token"]
        const res = await axios.post(cloudinaryUploadUrl, form, config)
        setUploadedVideoInfo({
            ...uploadedVideoInfo,
            videoUrl: res.data.url,
            videoPublicId: res.data.public_id
        })
        alert.show("video uploaded successfully", {
            type: "success"
        })
        setVideoFile(null)
        setVideoFileToCloudinary(null)
        closeVideoUploadDialog()
        setLoaded(0)
        } catch (error) {
            console.log(error)
        }
    }

    const getModulesByCourseId = async (courseId) => {
        try {
            if(localStorage.getItem("token")){
                setAuthToken(localStorage.getItem("token"))
            }
            setModulesLoading(true)
            const res = await await axios.get(`/api/v1/coursechapter/${course._id}`)
            setModules(res.data)
            setModulesLoading(false)
        } catch (error) {
            setModulesLoading(false)
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert.show(element.msg, {
                        type:"error"
                    })
                });
            }
        }
    }

    useEffect(() => {
        if(course !== null){
            getModulesByCourseId(course._id)
        }
         // eslint-disable-next-line
    }, [course])
    

    useEffect(() => {
        if(match.params.courseId){
            // run code to get course by ID
            getCourse(match.params.courseId)
        }
    }, [getCourse, match.params.courseId])

    return <>
        <div className="dashboard-layout">
            <Container fluid>
                <Row>
                <DashboardNavbar />
                 <Col>
                  <div className="page-actions">
                    <div className="mt-5 course-module">
                        <h2 className="page-title-color text-center">Create Course Modules</h2>
                        <p className="page-title-color text-center">Organize course curriculum</p>

                        {
                            course === null ? <p className="text-center lead">Loading...</p> : <>
                                 <div className="modules-container shadow">
                            <div className="modules-container__header">
                                <h3 className="modules-container__header-title">Course Structure</h3>
                                <i onClick={openModuleModal} className="fas fa-plus-circle modules-container__icon"></i>
                                <i className="fas fa-question-circle modules-container__icon"></i>
                            </div>
                            <div className="modules-container__body">
                                {
                                    modluesLoading === true ? <p className="lead text-center">modules loading...</p> : <>
                                        {
                                             modules.length === 0 ? <AddNewModule
                                             openModalDialog={openModuleModal}
                                              /> : modules.map((module) => <CourseModuleItem key={module._id} module={module} openVideoModal={openVideoModal} />)
                                        }
                                    </>
                                }
                            </div>
                        </div>
                            </>
                        }
                    </div>
                 </div>
                 </Col>
                </Row>
            </Container>
        </div>
        <Modal
           className="modal-dialog-centered add-module-loader"
           isOpen={launchAddModuleModal}
         >
          <div style={{
              fontWeight:'600',
              textTransform:'uppercase',
              fontSize:'17px',
              color:'#3d3d3d'
          }} className="modal-header">
              Add a new Module
          </div>
          <div className="modal-body">
            <FormGroup className="mb-3 mt-3">
                <Input
                type="text"
                className="form-control-alternative"
                placeholder="Enter Module Name"
                onChange={e => updateModuleNameFromInput(e)}
                />
            </FormGroup>
          </div>
          <div className="modal-footer">
            <Button style={{
                boxShadow:'none',
                color:'#3d3d3d',
                backgroundColor:'#fff',
                border:'0.7px solid #3d3d3d',
                paddingLeft:'35px',
                paddingRight:'35px'
            }} onClick={closeModuleModal} size="large" className="add-module-btn__cancel">Cancel</Button>
            <Button 
             onClick={addModuleToCourse}
            style={{
                color:'#fff',
                backgroundColor:'#3d3d3d',
                paddingLeft:'30px',
                paddingRight:'30px'
            }} size="large" className="add-module-btn__save">Add Module</Button>
          </div>
         </Modal>
         <Modal
           className="modal-dialog-centered add-video-loader"
           isOpen={launchAddVideoModal}
         >
          <div style={{
              fontWeight:'600',
              textTransform:'uppercase',
              fontSize:'17px',
              color:'#3d3d3d'
          }} className="modal-header">
              Upload Video Content
          </div>
          <div className="modal-body">
              <VideoUploadModal
                videoUploadDialog={videoUploadDialog}
                fileToSend={videoFile}
                loaded={loaded}
                videoFilePickerHandler={buttonFilePickerEventHandler}
                closeVideoUploadDialog={closeVideoUploadDialog}
                uploadVideo={uploadVideo}
              />
            <FormGroup className="mb-3 mt-3">
                <Input
                type="text"
                className="form-control-alternative"
                placeholder="Enter Lesson title"
                onChange={e => updateVideoLessonTitle(e)}
                value={newLessonName}
                />
            </FormGroup>
            <input
                type="file"
                ref={videoFileInputRef}
                style={{ display:'none'}}
                onChange={e => videoLessonFilePickerHandler(e)}
                />
             <FormGroup className="mb-3 mt-3">
                 <Button onClick={openVideoUploadDialog} block>Upload Media File</Button>
             </FormGroup>
             {
                 uploadedVideoInfo.videoUrl.length === 0 && <p className="video-file-required-text">
                     video file required
                 </p>
             }
          </div>
          <div className="modal-footer">
            <Button style={{
                boxShadow:'none',
                color:'#3d3d3d',
                backgroundColor:'#fff',
                border:'0.7px solid #3d3d3d',
                paddingLeft:'35px',
                paddingRight:'35px'
            }} onClick={closeVideoModal} size="large">Cancel</Button>
            <Button 
             onClick={saveVideo}
             disabled={uploadedVideoInfo.videoUrl.length === 0}
            style={{
                color:'#fff',
                backgroundColor:'#3d3d3d',
                paddingLeft:'30px',
                paddingRight:'30px'
            }} size="large">Save Video</Button>
          </div>
         </Modal>
    </>
}

const mapStateToProps = (state) => ({
    course: state.course.courseDetails
})

const mapDispatchToProps = (dispatch) => ({
    getCourse: (courseId) => dispatch(getCourseById(courseId)),
    displayLoader: () => dispatch(startLoading()),
    removeLoader: () => dispatch(stopLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseModules)