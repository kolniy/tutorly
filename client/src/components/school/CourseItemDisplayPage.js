import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, 
    Col, 
    TabContent,
    TabPane,
    NavItem,
    NavLink,
    Nav,
    Card,
    CardBody,
    Button
} from 'reactstrap'
import StartRatings from "react-star-ratings"
import PageNavbar from './PageNavbar'
// import CourseThumbnailPreview from '../../images/course-preview.jpg'
import ModuleItem from './ModuleItem'
import { addToCart } from '../../actions/cart'

import '../../custom-styles/pages/courseitemdisplaypage.css'

export const CourseItemDisplayPage = ({ match, cart, addCourseToCart }) => {

    const [ course, setCourse ] = useState(null)
    const [ modules, setModules ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        getCourseDetails(match.params.schoolname, match.params.courseItemTitle)
    }, [match.params.schoolname, match.params.courseItemTitle])    

    useEffect(() => {
        getCourseModules(course?._id)
    }, [course])

    const getCourseDetails = async (schoolName, courseTitle) => {
       try {
        const res = await axios.get(`/api/v1/school/${schoolName}/${courseTitle}`)
        setCourse(res.data)
        setLoading(false)
       } catch (error) {
        if(error.response.status === 404){
            setCourse(null)
            setLoading(false)
            setLoading(false)
        }
        setLoading(false)
        console.log(error)
       }
    }

    const getCourseModules = async (courseId) => {
        try {
            const res = await axios.get(`/api/v1/school/course/module/${courseId}`)
            setModules(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const [tabs, setTabs] = useState(1)
    const toggleNavs = (e, index) => {
        e.preventDefault()
        setTabs(index)
    }

    const totalCourseRatings = course?.reviews?.reduce((prev, curr) => {
        return prev + curr.star
    },0)

    return <>
       {
           loading === true ? <div style={{
            width:'50%',
            margin:'20px auto',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <i style={{fontSize:'22px'}} className="fas fa-circle-notch fa-spin"></i>
        </div> :
           <>
            {
                !loading && course === null ? <p className="text-center lead">Course not found</p> : 
                <>
                <PageNavbar pageName={match.params.schoolname} />
        <div className="course-item-basic-info">
            <Container fluid style={{
                width:'70%'
            }}>
                <div className="course-item-details mt-4">
                    <Row>
                        <Col md="6" sm="6" xs="12">
                           <div className="course-item-details-img-contain">
                           <img src={course.thumbnail} 
                              className="img-fluid"
                              alt="course thumbnail previewer"
                            />
                           </div>
                        </Col>
                        <Col md="6" sm="6" xs="12">
                            <div className="course-item-about">
                                <h3>{course.title}</h3>
                                <div className="course-item-summary">
                                    <div className="published-year">{new Date(course.createdAt).getFullYear()}</div>
                                    <div className="number-of-episodes">{course.coursechapters.length} Episodes</div>
                                    <div className="course-total-time">14h 22m</div>
                                </div>
                                <p className="course-item-details-text">
                                    {course.description}. 
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
        <div className="course-item-secondary-info">
        <div className="tabs-container">
        <Container fluid style={{
                width: '65%'
            }}>
        <Nav
            className="flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={tabs === 1}
                className={`"mb-sm-3 mb-md-0" ${tabs === 1 && 'active'}`}
                onClick={e => toggleNavs(e, 1)}
                href="#pablo"
                role="tab"
              >
                Lectures
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={tabs === 2}
                className={`"mb-sm-3 mb-md-0" ${tabs === 2 && 'active'}`}
                onClick={e => toggleNavs(e, 2)}
                href="#pablo"
                role="tab"
              >
                More
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
         </div>
         <Container>
    <Card className="mt-2">
        <CardBody>
            <TabContent activeTab={"tabs" + tabs}>
                <TabPane tabId="tabs1">
                    {
                     modules.length === 0 ? <p style={{ color:'#fff'}}>No Course Modules Found</p> : <>
                        {
                             modules.map((module) =>  <ModuleItem key={module._id} module={module} />)
                        }
                     </>
                    }
                </TabPane>
                <TabPane tabId="tabs2">
                    Course More Info
                </TabPane>
            </TabContent>
        </CardBody>
    </Card>
         </Container>
 </div>
   <div className="add-to-cart-cta">
        <Container fluid style={{
            width: "90%"
        }}>
            <Row>
                <Col className="mb-3" md="4" sm="4" xs="12">
                    <div className="course-name-and-price">
                        <p className="course-name">{course.title}</p>
                        <div className="course-price-and-rating">
                            <p className="course-price">
                                {course.price}$
                            </p>
                            <div className="ratings">
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
                        </div>
                    </div>
                </Col>
                <Col className="mb-3" md="4" sm="4" xs="12">
                    <div className="action-container">
                       {
                           cart.find((item) => item.itemId === course._id) !== undefined ? (
                            <Button tag={Link} to={`/${match.params.schoolname}/cart`} className="action-btn add-to-cart-btn">Go To Cart</Button>
                           ) :
                            (<Button onClick={e => addCourseToCart(course)} className="action-btn add-to-cart-btn">Add to cart</Button>)
                       }
                    </div>
                </Col>
                <Col className="mb-3" md="4" sm="4" xs="12">
                    <div className="action-container">
                    <Button className="action-btn get-course-btn">Get Course</Button>
                    </div>
                </Col>
            </Row>
        </Container>
   </div>
    <div className="footer">
        <p className="text-center copy mt-6 pt-5">Copyright { new Date().getFullYear()} {match.params.schoolname}</p>
    </div>
                </>
            }
           </>
       }
    </>
}

const mapStateToProps = (state) => ({
    cart: state.cart
 })
 
 const mapDispatchToProps = (dispatch) => ({
    addCourseToCart: (courseDetails) => dispatch(addToCart(courseDetails))
 })

export default connect(mapStateToProps, mapDispatchToProps)(CourseItemDisplayPage)
