import React, { useState, useRef, useEffect } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../../../actions/types"
import axios from 'axios'
import { useAlert } from "react-alert"
import { 
    Row,
    Col,
    Container,
    Form,
    FormGroup,
    Button,
    Card,
    CardBody,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    Progress
} from "reactstrap"
import DashboardNavbar from "../DashboardNavbar"
import { createNewCourse } from "../../../actions/course"

import "../../../custom-styles/dashboard/dashboardlayout.css";
import "../../../custom-styles/dashboard/createcourse.css"

const CreateCourse = ({ 
  school,
  createSchoolCourse,
  history,
  updatePageSelector
}) => {

    const alert = useAlert()
    const thumbnailInputRef = useRef()
    const [ fileToSend, setFileToSend ] = useState(null)
    const [ imageToCloudinary, setImageToCloudinary ] = useState(null)
    const [ showUploadModalThumnail, setShowUploadModalThumnail ] = useState(false)
    const [ loaded, setLoaded ] = useState(0)
    const [ formInputs, setFormInputs ] = useState({
      title: "",
      subtitle: "",
      category: "",
      description: "",
      prerequisite: "",
      language: "",
      level: "",
      thumbnail: "",
      coursethumbnailId:"",
      price: 0
    })

    useEffect(() => {
      updatePageSelector(2)
      // eslint-disable-next-line
    }, [])

    const { title, subtitle,
      category, description,
     prerequisite, language,
      level, price, thumbnail } = formInputs

      const closeUploadThumbnailModal = () => setShowUploadModalThumnail(false)
      const launchUploadThumbnailModal = () => setShowUploadModalThumnail(true)

    const handleFormSubmitHandler = (e) => {
        e.preventDefault()

        if(title.length === 0){
         return alert.show("title cannot be empty", {
            type:"error"
          })
        }

        if(subtitle.length === 0){
          return alert.show("subtitle cannot be empty", {
            type:"error"
          })
        }

        if(category.length === 0){
          return alert.show("category cannot be empty", {
            type: "error"
          })
        }

        if(description.length === 0){
          return alert.show("description cannot be empty", {
            type: "error"
          })
        }

        if(prerequisite.length === 0){
          return alert.show("prerequisite cannot be empty", {
            type: "error"
          })
        }

        if(language.length === 0){
          return alert.show("language cannot be empty", {
            type: "error"
          })
        }

        if(level.length === 0){
          return alert.show("level cannot be empty", {
            type: "error"
          })
        }

        createSchoolCourse(formInputs, school._id, history, '/dashboard/course/setup/module')
      }

    const updateFormFields = (e) => setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    })

    const filePickerEventHandle = (e) => {
        if(e.target.files.length === 0){
          setFileToSend(null)
        }

        const fileSize = e?.target?.files[0]?.size / 1024 / 1024 // file size in mb
        if(fileSize > 30){
          return alert.show("File Size exceeds maximum limit, choose another file", {
            type:"error"
        })
        }

        // const fileType = `.${e.target.files[0].name.split(".")[e.target.files[0].name.split(".").length - 1]}`
        // if(fileType !== '.png' || fileType !== '.jpg' || fileType !== '.jpeg'|| fileType !== '.PNG' || fileType !== '.JPG' || fileType !== '.JPEG'){
        //   return alert.show("thumbnail must be an image", {
        //     type: "error"
        //   })
        // }

        setFileToSend(e.target.files[0])
        const reader = new FileReader()
        reader.addEventListener('load', function() {
              setImageToCloudinary(reader.result)
        }, false)

        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0])
      }
    } 

    const uploadThumbnail = async () => {
    
      const cloudinaryCloudName = 'kolaniyi'
      const CloudinaryUploadPreset = 'bqrfvvim'
      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`

      const form = new FormData()
      form.append("upload_preset", CloudinaryUploadPreset)
      form.append("file", imageToCloudinary)

      // axios header config
      const config = {
        onUploadProgress: (event) => {
            setLoaded(event.loaded / event.total * 100)
        }
      }

      try {
        delete axios.defaults.headers.common["x-auth-token"]
        const res = await axios.post(cloudinaryUploadUrl, form, config)
        setFormInputs({
          ...formInputs,
          thumbnail: res.data.url,
          coursethumbnailid: res.data.public_id
        })
        alert.show("Thumbnail Uploaded Successfully", {
          type: "success"
        })
        setFileToSend(null)  // reset image
        setImageToCloudinary(null)  // reset image
        closeUploadThumbnailModal()  // close thumbnail
        setLoaded(0)
      } catch (error) {
        console.log(error)
      }
    }

    const pickThumbnailFile = () => {
      thumbnailInputRef.current.click()
    }

    return <>
        <div className="dashboard-layout">
            <Container fluid>
                <Row>
                <DashboardNavbar />
                 <Col>
        <div className="page-actions">
        <div className="page-actions__create-course-form">
          <Card className="shadow create-course-card mt-5">
          <CardBody>
          <h1 className="page-action__info text-center">
            Create New Course
          </h1>
        <Form onSubmit={e => handleFormSubmitHandler(e)}>
          <FormGroup>
          <input
            type="text"
            class="form__input"
            placeholder="Course Title"
            name="title"
            id="title"
            value={title}
            onChange={e => updateFormFields(e)}
            required
            autoFocus
            />
          <label for="title" className="form__label">Course Title</label>
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Course Subtitle"
            name="subtitle"
            id="subtitle"
            value={subtitle}
            onChange={e => updateFormFields(e)}
             required
            />
            <label for="subtitle" className="form__label">Course Subtitle</label>
        </FormGroup>
          <FormGroup>
            <Input
            type="select"
            class="form__input"
            placeholder="Select Category"
            name="category"
            id="category"
            value={category}
            onChange={e => updateFormFields(e)}
            required
            >
            <option value="">Choose Category</option>
            <option value="programming">Programming</option>
            <option value="cyber security">Cyber Security</option>
            <option value="interface design">UI/UX</option>
            <option value="graphics design">Graphics Design</option>
            <option value="nutritions">Nutritions</option>
            <option value="music production">Music Production</option>
            <option value="web design">Web Design</option>
            <option value="singing">Singing</option>
            <option value="trading">Trading</option>
            <option value="cryto currency">Cryto currency</option>
            </Input>
            </FormGroup> 
          <FormGroup>
            <Input
            className="form__input"
            placeholder="Course description"
            rows="3"
            type="textarea"
            name="description"
            value={description}
            onChange={e => updateFormFields(e)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Prerequisites"
            name="prerequisite"
            id="prerequisite"
            value={prerequisite}
            onChange={e => updateFormFields(e)}
            required
            />
            <label for="prerequisites" className="form__label">Prerequisites</label>
        </FormGroup>
        <FormGroup>
            <Input
            type="select"
            class="form__input"
            placeholder="Select Language"
            name="language"
            id="language"
            value={language}
            onChange={e => updateFormFields(e)}
            required
            >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="arabic">Arabic</option>
            <option value="yoruba">Yoruba</option>
            <option value="west african pidgin">West African Pidgin</option>
            <option value="igbo">Igbo</option>
            </Input>
        </FormGroup> 
        <FormGroup>
            <Input
            type="select"
            class="form__input"
            placeholder="Select Level"
            name="level"
            id="level"
            value={level}
            onChange={e => updateFormFields(e)}
            required
            >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            </Input> 
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Course Price ($)"
            name="price"
            id="price"
            value={price}
            onChange={e => updateFormFields(e)}
             required
            />
            <label for="price" className="form__label">Course Price ($)</label>
        </FormGroup> 
        <FormGroup>
          <input 
           style={{ display:'none'}}
           ref={thumbnailInputRef}
           type="file" onChange={e => filePickerEventHandle(e)} />
          <Button onClick={launchUploadThumbnailModal} block>Upload Thumbnail</Button>
          {
            thumbnail.length === 0 && <p className="mt-2 create-course-validation-text">course thumbnail cannot be empty</p>
          }
        </FormGroup>
          <FormGroup className="mt-3">
            <Button
            className="create-course-btn"
             type="submit"
             size="lg"
             disabled={thumbnail.length === 0}
             >
                Create Course
             </Button>
          </FormGroup>
          </Form>
          </CardBody>
           </Card>
                   </div>
                 </div>
                 </Col>
                </Row>
            </Container>
        </div>
      <div className="create-course-modal">
      <Modal centered isOpen={showUploadModalThumnail}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
          Upload Course Thumbnail
        </div>
        <ModalBody>
            {
              fileToSend !== null && fileToSend !== undefined && <>
                 <div className="picked-file-container">
                    <div style={{
                      width:'80%',
                      margin:'0 auto'
                    }}>
                    <p style={{
                        overflowWrap:'break-word',
                        textAlign:'center'
                    }}  className="lead text-center">{fileToSend.name}</p>
                    </div>
                      {
                      loaded > 0 &&
                        <Row>
                            <Col sm="12" md="12">
                            <div className="course-thumbnail-upload-progress">
                            <p className="lead">Upload Progress</p>
                                {
                                <Progress striped max="100" style={{
                                  backgroundColor:'#242121'
                                }} value={loaded}>
                                   {
                                Math.round(loaded, 2)
                                }%
                             </Progress>
                                 }
                             </div>
                            </Col>
                        </Row>
                        }
                 </div>
              </>
            }
         <Button block onClick={pickThumbnailFile}>Pick File</Button>
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} onClick={closeUploadThumbnailModal}>Cancel</Button>{' '}
          <Button
          disabled={fileToSend === null}
          onClick={e => uploadThumbnail()}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Upload</Button>
        </ModalFooter>
      </Modal>
      </div>
    </>
}

const mapStateToProps = (state) => ({
  school: state.school.schoolDetails
})

const mapDispatchToProps = (dispatch) => ({
  createSchoolCourse : (formData, schoolId, history, routeTo) => dispatch(createNewCourse(formData, schoolId, history, routeTo)),
  updatePageSelector: (counter) => dispatch({type: UPDATE_DASHBOARD_PAGE_COUNTER, payload:counter })
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateCourse))
