import React from 'react'
import { Button } from 'reactstrap'
import StartRatings from "react-star-ratings"

export const CartItem = ({ cartItem }) => {
    return (
        <div key={cartItem.itemId} className="cart-item mb-3">
                <div className="cart-item-basic-info-and-old-price">
                <div className="cart-item-details-img-contain">
                           <img src={cartItem.itemImg} 
                              className="img-fluid"
                              alt="cart item preview"
                            />
                           </div>
                            <div className="cart-item-about">
                                <h3>{cartItem.itemName}</h3>
                                <div className="cart-item-summary">
                                    <div className="published-year">{new Date().getFullYear()}</div>
                                    <div className="cart-item-course-total-time">14h 22m</div>
                                </div>
                                <div className="ratings">
                                <StartRatings
                                isSelectable={false}
                                starHoverColor="orangered"
                                rating={4}
                                // rating={course.reviews.length === 0 ? 0 : totalCourseRatings / course.reviews.length } 
                                starDimension='20px'
                                isAggregateRating={true}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starSpacing='5px'
                                name='rating'
                                />
                            </div>
                            <div className="episode-number">14 Episodes</div>
                         </div>
                    <div className="old-price">
                        <h2>$57</h2>
                    </div>
                </div>
                <div className="cart-actions-and-valid-price mt-3">
                    <div className="cart-actions">
                        <Button>Remove</Button>
                        <Button>Save</Button>
                    </div>
                    <div className="cart-price">
                      <h2>$30</h2>
                    </div>
                </div>
         </div>
    )
}

export default CartItem
