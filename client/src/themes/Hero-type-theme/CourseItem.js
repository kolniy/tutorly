import React from 'react'
import { connect } from 'react-redux'
import { Col, 
   Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText } from "reactstrap"
import { Link } from "react-router-dom"
import { addToCart } from '../../actions/cart'

export const CourseItem = ({ course, school, cart, addCourseToCart }) => {

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
               {
                  cart.find((item) => item.itemId === course._id) !== undefined ? (
                     <Link to={`/${school.name}/cart`}>View Cart</Link>
                  ) : (
                     <div onClick={e => addCourseToCart(course)} className="add-to-cart">
                  <i className="fas fa-shopping-cart"></i>
               </div>
                  )
               }
             </div>
          </CardBody>
         </Card>
          </div>
        </Col>
    </>
}

const mapStateToProps = (state) => ({
   cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
   addCourseToCart: (courseDetails) => dispatch(addToCart(courseDetails))
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseItem)
