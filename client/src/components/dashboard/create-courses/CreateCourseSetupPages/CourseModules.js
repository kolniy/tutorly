import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
import { addCourseModule, getCourseById } from "../../../../actions/course"
import AddNewModule from './AddNewModule'
import CourseModuleItem from './CourseModuleItem'


import "../../../../custom-styles/dashboard/dashboardlayout.css"
import "../../../../custom-styles/dashboard/coursemodule.css"

export const CreateCourseModules = ({
    modules,
    addModule,
    getCourse,
    course,
    match
}) => {

    const [ launchAddModuleModal, setLaunchAddModuleModal ] = useState(false)
    const alert = useAlert()
    const [ newModuleName, setNewModuleName ] = useState({
        name:""
    })
    
    const openModuleModal = () => setLaunchAddModuleModal(true)
    const closeModuleModal = () => setLaunchAddModuleModal(false)

    const updateModuleNameFromInput = (e) => setNewModuleName({
        ...newModuleName,
          name: e.target.value
    })
    const addModuleToCourse = () => {
        if(newModuleName.name.length === 0){
            return alert.show("module name cannot be empty", {
                type: "error"
            })
        }
        addModule(newModuleName, course._id)
        closeModuleModal(false)
    }

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
                    <div className="text-center mt-5 course-module">
                        <h2 className="page-title-color">Create Course Modules</h2>
                        <p className="page-title-color">Organize course curriculum</p>

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
                                    modules.length === 0 ? <AddNewModule
                                    openModalDialog={openModuleModal}
                                     /> : modules.map((module) => <CourseModuleItem key={module._id} module={module} />)
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
    </>
}

const mapStateToProps = (state) => ({
    modules: state.course.coursemodules,
    course: state.course.courseDetails
})

const mapDispatchToProps = (dispatch) => ({
    addModule: (moduleName, courseId) => dispatch(addCourseModule(moduleName, courseId)),
    getCourse: (courseId) => dispatch(getCourseById(courseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseModules)