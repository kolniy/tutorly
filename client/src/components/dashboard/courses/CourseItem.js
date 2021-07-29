import React from 'react'
import { Link } from "react-router-dom"
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    Col
} from "reactstrap"
import StartRatings from "react-star-ratings"

export const CourseItem = ({ course }) => {

   const totalCourseRatings = course.reviews.reduce((prev, curr) => {
         return prev + curr.star
   },0)

    return <>
       <Col xs="12" sm="6" md="6" xl="4">
       <Card className="course-card shadow">
         <Link to={`/dashboard/course/setup/module/${course._id}`}>
             <CardImg
                className="img-fluid"
                alt="..."
                src={course.thumbnail}
                top
              />
         </Link>
          <CardBody>
            <CardTitle>
            <Link to={`/dashboard/course/setup/module/${course._id}`}>
               { course.title }
            </Link>
            </CardTitle>
            <CardText>
               {`${course.author.firstname} ${course.author.lastname}`}
            </CardText>
             <div className="course-card-star-rating">
                <div className="ratings-text">3.0</div>
                <div className="ratings"> <StartRatings
				 isSelectable={false}
				 starHoverColor="orangered"
				 rating={course.reviews.length === 0 ? 0 : totalCourseRatings / course.reviews.length } 
				 starDimension='20px'
				 isAggregateRating={true}
				 starRatedColor="orange"
				 numberOfStars={5}
				 starSpacing='5px'
				name='rating'
			 /></div>
             </div>
             <p className="course-card-price">
                ${course.price}
             </p>
          </CardBody>
        </Card>
       </Col>
    </>
}

export default CourseItem