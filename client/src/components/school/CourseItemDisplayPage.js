import React, { useState } from 'react'
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
import CourseThumbnailPreview from '../../images/course-preview.jpg'
import ModuleItem from './ModuleItem'


import '../../custom-styles/pages/courseitemdisplaypage.css'

export const CourseItemDisplayPage = ({ match }) => {

    const [tabs, setTabs] = useState(1)
    const toggleNavs = (e, index) => {
        e.preventDefault()
        setTabs(index)
    }

    return <>
        <PageNavbar pageName={match.params.schoolname} />
        <div className="course-item-basic-info">
            <Container fluid style={{
                width:'70%'
            }}>
                <div className="course-item-details mt-4">
                    <Row>
                        <Col md="6" sm="6" xs="12">
                           <div className="course-item-details-img-contain">
                           <img src={CourseThumbnailPreview} 
                              className="img-fluid"
                              alt="course thumbnail previewer"
                            />
                           </div>
                        </Col>
                        <Col md="6" sm="6" xs="12">
                            <div className="course-item-about">
                                <h3>Journey into the wood</h3>
                                <div className="course-item-summary">
                                    <div className="published-year">2021</div>
                                    <div className="number-of-episodes">4 Episodes</div>
                                    <div className="course-total-time">14h 22m</div>
                                </div>
                                <p className="course-item-details-text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Quis ipsum suspendisse ultrices gravida.
                                Risus commodo viverra maecenas accumsan
                                lacus vel facilisis. 
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
                    <ModuleItem />
                    <ModuleItem />
                    <ModuleItem />
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
                        <p className="course-name">Journey into the wood</p>
                        <div className="course-price-and-rating">
                            <p className="course-price">
                                30$
                            </p>
                            <div className="ratings">
                            <StartRatings
                            isSelectable={false}
                            starHoverColor="orangered"
                            // rating={course.reviews.length === 0 ? 0 : totalCourseRatings / course.reviews.length } 
                            rating={3}
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
                        <Button className="action-btn add-to-cart-btn">Add to cart</Button>
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
        <p className="text-center copy mt-6 pt-5">Copyright { new Date().getFullYear()} Sano's Wood</p>
    </div>
    </>
}

export default CourseItemDisplayPage 
