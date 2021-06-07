import React from 'react'
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    Col
} from "reactstrap"
import StartRatings from "react-star-ratings"
import courseImgPreview from "../../../images/course-preview.jpg"

export const CourseItem = () => {
    return <>
       <Col xs="6" sm="3" md="3">
       <Card className="course-card shadow">
          <CardImg
            alt="..."
            src={courseImgPreview}
            top
          />
          <CardBody>
            <CardTitle>
            Davinci Resolve 17 Tutorials: All you need to know about Davinci Resolve 17
            </CardTitle>
            <CardText>
             Master Yoda
            </CardText>
             <div className="course-card-star-rating">
                <div className="ratings-text">3.0</div>
                <div className="ratings"> <StartRatings
				 isSelectable={false}
				 starHoverColor="orangered"
				 rating={3} 
				 starDimension='20px'
				 isAggregateRating={true}
				 starRatedColor="orange"
				 numberOfStars={5}
				 starSpacing='5px'
				name='rating'
			 /></div>
             </div>
             <p className="course-card-price">
                $40.00
             </p>
          </CardBody>
        </Card>
       </Col>
    </>
}

export default CourseItem