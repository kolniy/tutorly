import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col,
     Container,Button,
     Modal, ModalBody,
     ModalFooter, Card, 
     CardBody, Form,
     FormGroup, Input
    } from 'reactstrap'
import { useAlert } from 'react-alert'    
import DashboardNavbar from '../DashboardNavbar'
import { getCourseById, updateCourseById,
        publishCourse, retractCourse
} from '../../../actions/course'
import StartRatings from "react-star-ratings"
import CourseModuleOrganiser from '../create-courses/CreateCourseSetupPages/CourseModuleOrganiser'

import '../../../custom-styles/dashboard/dashboardlayout.css'
import '../../../custom-styles/dashboard/coursepreviewpage.css'

export const PreviewPageForExistingCourse = ({
    match,
    course,
    getCourse,
    updateCourse,
    publish,
    retract
}) => {

    const totalCourseRatings = course?.reviews?.reduce((prev, curr) => {
        return prev + curr.star
    }, 0)

    const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false)
    const alert = useAlert()

    const closeUpdateCourseModal = () => setShowUpdateCourseModal(false)
    const openUpdateCourseModal = () => setShowUpdateCourseModal(true)

    const [ courseObject, updateCourseObject ] = useState({
        title: "",
        subtitle: "",
        category: "",
        description: "",
        prerequisite: "",
        language: "",
        level: "",
        price: 0,
        coursediscount: ""
    })

    const { title, subtitle,
         category, description,
         prerequisite, language,
         level, price
        } = courseObject

    useEffect(() => {
        if(course !== null){
          updateCourseObject({
            title: course.title,
            subtitle: course.subtitle,
            category: course.category,
            description: course.description,
            prerequisite: course.prerequisite,
            language: course.language,
            level: course.level,
            price: course.price,
            coursediscount: course?.coursediscount
          })
        }
    }, [course])

    const updateCourseData = (e) => {
        updateCourseObject({
            ...courseObject,
            [e.target.name]: e.target.value
        })
    }

    const onHandleCourseUpdate = () => {
        if(title.length === 0){
            return alert.show('course title cannot be empty', {
                type: 'error'
            })
        }
        if(subtitle.length === 0){
            return alert.show('course subtitle cannot be empty', {
                type: 'error'
            })
        }
        if(category.length === 0){
            return alert.show('course category cannot be empty', {
                type: 'error'
            })
        }
        if(description.length === 0){
            return alert.show('course description cannot be empty', {
                type: 'error'
            })
        }
        if(prerequisite.length === 0){
            return alert.show('course prerequisite cannot be empty', {
                type: 'error'
            })
        }
        if(language.length === 0){
            return alert.show('course language cannot be empty', {
                type: 'error'
            })
        }
        if(level.length === 0){
            return alert.show('course level cannot be empty', {
                type:'error'
            })
        }
        if(!price){
            return alert.show('course price not valid', {
                type: 'error'
            })
        }
        updateCourse(course._id, courseObject)
        closeUpdateCourseModal()
    }

    const publishCourse = () => {
        publish(course._id)
    }

    const unpublishCourse = () => {
        retract(course._id)
    }

    useEffect(() => {
        getCourse(match.params.courseId)
    }, [getCourse, match.params.courseId])

    return <>
        <div className="dashboard-layout">
            <Container fluid>
                <Row>
                  <DashboardNavbar />
                  <Col>
                    <div className="page-actions">
                        <div className="mt-5 course-item-preview-page">
                                <Container>
                                 {
                                     course === null ? <p className="text-center lead">Loading...</p> : <>
                                      <div className="page-title">
                                            <h2>Course Preview and Update</h2>
                                        </div>
                        <div className="dashboard-course-item-details mt-4">
                           <div className="dashboard-course-item-details-img-contain">
                            <img src={course.thumbnail} 
                                className="img-fluid"
                                alt="course thumbnail previewer"
                                />
                           </div>
                            <div className="dashboard-course-item-about">
                                <h3>{course.title}</h3>
                                <p className="mt-3">{`${course.author.firstname} ${course.author.lastname}`}</p>
                                <div className="ratings">
                                    <span className="ml-2 mr-2">{course.reviews.length === 0 ? 0 : totalCourseRatings / course.reviews.length}</span>
                                    <StartRatings
                                    isSelectable={false}
                                    starHoverColor="orangered"
                                    rating={course.reviews.length === 0 ? 0 : totalCourseRatings / course.reviews.length } 
                                    starDimension='20px'
                                    isAggregateRating={true}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    starSpacing='5px'
                                    name='rating'
                                />
                                </div>
                                <h4 className="course-item-price">${course.price}</h4>
                                <div className="course-actions">
                                <Button onClick={openUpdateCourseModal} className="update-course-btn">Update Course</Button>
                                {
                                    course.published === false ? (<Button onClick={publishCourse} className="publish-course-actions-btn">Publish Course</Button>) : 
                                    (<Button onClick={unpublishCourse} className="publish-course-actions-btn">Retract Course</Button>)
                                }
                                </div>
                            </div>
                         </div>
                                     </>
                                 }
                                </Container>
                        </div>
                        <CourseModuleOrganiser />
                    </div>
                  </Col>
                </Row>
            </Container>
        </div>
        <Modal size="lg" isOpen={showUpdateCourseModal}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
          Update Course - {course?.title}
        </div>
        <ModalBody>
         <div className="update-course-card">
         <Card>
        <CardBody> 
        <Form>
          <FormGroup>
          <input
            type="text"
            class="form__input"
            placeholder="Course Title"
            name="title"
            id="title"
            value={courseObject.title}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.subtitle}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.category}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.description}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.prerequisite}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.language}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.level}
            onChange={e => updateCourseData(e)}
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
            value={courseObject.price}
            onChange={e => updateCourseData(e)}
             required
            />
            <label for="price" className="form__label">Course Price ($)</label>
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Course Discount (%)"
            name="coursediscount"
            id="coursediscount"
            value={courseObject.coursediscount}
            onChange={e => updateCourseData(e)}
             required
            />
            <label for="coursediscount" className="form__label">Course Discount (%)</label>
        </FormGroup>
          </Form>
          </CardBody>
        </Card>
         </div>
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} onClick={closeUpdateCourseModal}>Cancel</Button>{' '}
          <Button
          onClick={onHandleCourseUpdate}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Update</Button>
        </ModalFooter>
      </Modal>
    </>
}

const mapStateToProps = (state) => ({
    course: state.course.courseDetails
})

const mapDispatchToProps = (dispatch) => ({
    getCourse: (courseId) => dispatch(getCourseById(courseId)),
    updateCourse: (courseId, updateBody) => dispatch(updateCourseById(courseId, updateBody)),
    publish: (courseId) => dispatch(publishCourse(courseId)),
    retract: (courseId) => dispatch(retractCourse(courseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPageForExistingCourse)