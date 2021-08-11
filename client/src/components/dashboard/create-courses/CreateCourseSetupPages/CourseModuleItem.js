import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, Input, Button } from 'reactstrap'
import { updateModule, deleteModule } from "../../../../actions/modules"
import CourseVideoItem from './CourseVideoItem'

export const CourseModuleItem = ({ module, openVideoModal, update, deleteCourseModule }) => {

    const [ moduleNameUpdate, setModuleNameUpdate ] = useState(module.name)
    const handleModuleNameInput = (e) => setModuleNameUpdate(e.target.value)

    const [ openModuleUpdateModal, setOpenModuleUpdateModal ] = useState(false)
    const [ deleteModuleModal, setDeleteModuleModal ] = useState(false)

    const openUpdate = () => setOpenModuleUpdateModal(true)
    const closeUpdate = () => setOpenModuleUpdateModal(false)

    const openDeleteModal = () => setDeleteModuleModal(true)
    const closeDeleteModal = () => setDeleteModuleModal(false)

    const updateModule = () => {
        update({name: moduleNameUpdate}, module._id)
        closeUpdate()
    }

    const deleteModule = () => {
        deleteCourseModule(module._id)
        closeDeleteModal()
    }

    return <>
        <div className="course-module__item">
            <h4>
                {module.name}
            </h4>
            <hr className="moduleItem__hr" />
            <i onClick={e => openVideoModal(module._id)} className="fas fa-file-video"></i>
            <i onClick={openUpdate} className="fas fa-edit"></i>
            <i onClick={openDeleteModal} className="fas fa-trash-alt"></i>
        </div>
        {
                module.courseunit.length === 0 ? 
                <div className="no-video-message lead">
                    You have no lessons in this module
                </div> : <>{
                   module.courseunit.map((unit) =>  <CourseVideoItem key={unit._id} courseUnit={unit} />)
                }</>
        }
      <Modal centered isOpen={openModuleUpdateModal}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
          Update Module
        </div>
        <ModalBody>
           <Input
            type="text"
            className=""
            placeholder="update module name" 
            value={moduleNameUpdate}
            onChange={e => handleModuleNameInput(e)}
            />
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} onClick={closeUpdate}>Cancel</Button>{' '}
          <Button
          onClick={updateModule}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Update</Button>
        </ModalFooter>
      </Modal>

      <Modal centered isOpen={deleteModuleModal}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
          Delete Module
        </div>
        <ModalBody>
           <p className="text-center lead">Are you sure you want to delete this module with all it's course Unit's <br/> 
            <span style={{
                color:"#f5365c"
            }}>Caution</span> This cannot be changed!
           </p>
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} onClick={closeDeleteModal}>Cancel</Button>{' '}
          <Button
          onClick={deleteModule}
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
    update: (updates, moduleId) => dispatch(updateModule(updates, moduleId)),
    deleteCourseModule: (moduleId) => dispatch(deleteModule(moduleId))
})

export default connect(null, mapDispatchToProps)(CourseModuleItem)
