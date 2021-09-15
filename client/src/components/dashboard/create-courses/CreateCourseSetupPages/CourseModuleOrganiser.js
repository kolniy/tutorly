import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Modal,
    Button,
    FormGroup,
    Input } from 'reactstrap'
import { useAlert } from "react-alert"
import AddNewModule from './AddNewModule' 
import CourseModuleItem from './CourseModuleItem'
import { loadCourseModules, addNewCourseModule, addNewCourseUnitToModule } from "../../../../actions/modules"

const CourseModuleOrganiser = ({
    course,
    modules,
    modulesLoading,
    addCourseModule,
    loadModules,
    createUnit,
}) => {

    const [ launchAddModuleModal, setLaunchAddModuleModal ] = useState(false)
    const [ launchAddVideoModal, setLaunchAddVideoModal ] = useState(false)
    const [ moduleIdForVideoUpload, setModuleIdForVideoUpload ] = useState(null)
    const [ videoFile, setVideoFile ] = useState(null)
  
    const alert = useAlert()
    const [ newModuleName, setNewModuleName ] = useState({
        name:""
    })
    const videoFileInputRef = useRef()
    const [ newLessonName, setNewLessonName ] = useState("")
    
    const openModuleModal = () => setLaunchAddModuleModal(true)
    const closeModuleModal = () => setLaunchAddModuleModal(false)

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
    }

    // button references the video file picker
    const buttonFilePickerEventHandler = () => videoFileInputRef.current.click()

    // state update for the video name in modal
    const updateVideoLessonTitle = (e) => setNewLessonName(e.target.value)

    const addModuleToCourse = () => {
        if(newModuleName.name.length === 0){
            return alert.show("module name cannot be empty", {
                type: "error"
            })
        }
        addCourseModule(newModuleName, course._id)
        closeModuleModal(false)
    }

    const saveVideo = async () => {
        if(newLessonName.length === 0){
            return alert.show("lesson name cannot be empty", {
                type: "error"
            })
        }
        const formData = new FormData()
        formData.append('name', newLessonName)
        formData.append('videofile', videoFile)

        createUnit(formData, course._id, moduleIdForVideoUpload)
        
        closeVideoModal()
        setVideoFile(null)
        setNewLessonName('')
    }

    useEffect(() => {
        if(course !== null){
            loadModules(course._id)
        }
         // eslint-disable-next-line
    }, [course])

    return <>
        <div className="mt-5 course-module">
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
            modulesLoading === true ? <p className="lead text-center">modules loading...</p> : <>
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
                <Button onClick={buttonFilePickerEventHandler} block>Upload Media File</Button>
            </FormGroup>
            {
                videoFile === null && <p className="video-file-required-text">
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
            disabled={videoFile === null}
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
    course: state.course.courseDetails,
    modules: state.modules.courseModules,
    modulesLoading: state.modules.loading
})

const mapDispatchToProps = (dispatch) => ({
    addCourseModule: (moduleInfo, courseId) => dispatch(addNewCourseModule(moduleInfo, courseId)),
    loadModules: (courseId) => dispatch(loadCourseModules(courseId)),
    createUnit: (courseUnitDetails, courseId, moduleId) => dispatch(addNewCourseUnitToModule(courseUnitDetails, courseId, moduleId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseModuleOrganiser)