import React from 'react'
import { Col, 
   Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText } from "reactstrap"
import { Link } from "react-router-dom"

export const CourseItem = ({ course }) => {

    return <>
        <Col xs="12" sm="6" md="4" xl="3">
          <div className="course-item">
            {/* <div className="course-item-previewer"></div> */}
            <Card className="landing-page-course-card shadow">
         <Link>
             <CardImg
                className="img-fluid"
                alt="..."
                src={course.thumbnail}
                top
              />
         </Link>
          <CardBody>
            <CardTitle>
            <Link>
               { course.title }
            </Link>
            </CardTitle>
            <CardText>
               {`${course.author.firstname} ${course.author.lastname}`}
            </CardText>
             <p className="course-card-price">
                ${course.price}
             </p>
          </CardBody>
         </Card>
          </div>
        </Col>
    </>
}

export default CourseItem
