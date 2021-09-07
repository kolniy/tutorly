import React from 'react'
import { Col, 
   Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText } from "reactstrap"
import { Link } from "react-router-dom"

export const CourseItem = ({ course, school }) => {

   return <>
        <Col xs="12" sm="6" md="4" xl="3">
          <div className="course-item">
            {/* <div className="course-item-previewer"></div> */}
            <Card className="landing-page-course-card shadow">
         <Link to={`/${school.name}/${course.title}`}>
             <CardImg
                className="img-fluid"
                alt="..."
                src={course.thumbnail}
                top
              />
         </Link>
          <CardBody>
            <CardTitle>
            <Link to={`/${school.name}/${course.title}`}>
               { course.title }
            </Link>
            </CardTitle>
            <CardText>
               {`${course.author.firstname} ${course.author.lastname}`}
            </CardText>
             <div className="cart-icon-container-and-price">
             <p>
                ${course.price}
             </p>
              <i className="fas fa-shopping-cart"></i>
             </div>
          </CardBody>
         </Card>
          </div>
        </Col>
    </>
}

export default CourseItem
