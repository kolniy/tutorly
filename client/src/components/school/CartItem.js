import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import StartRatings from "react-star-ratings"
import { removeFromCart } from '../../actions/cart'

export const CartItem = ({ cartItem, removeItem }) => {

    const totalCourseRatings = cartItem?.itemReviews?.reduce((prev, curr) => {
        return prev + curr.star
    },0)


    return (
        <div key={cartItem.itemId} className="cart-item mb-3">
                <div className="cart-item-basic-info-and-old-price">
                    <div className="cart-item-basic-info">
                    <div className="cart-item-details-img-contain">
                           <img src={cartItem.itemImg} 
                              className="img-fluid"
                              alt="cart item preview"
                            />
                        </div>
                            <div className="cart-item-about">
                                <h3>{cartItem.itemName}</h3>
                                <div className="cart-item-summary">
                                    <span className="published-year">{new Date(cartItem.itemCreatedAt).getFullYear()}</span>
                                    <span className="cart-item-course-total-time ml-4">14h 22m</span>
                                </div>
                                <div className="ratings">
                                <StartRatings
                                isSelectable={false}
                                starHoverColor="orangered"
                                rating={cartItem?.itemReviews?.length === 0 ? 0 : totalCourseRatings / cartItem?.itemReviews?.length } 
                                starDimension='20px'
                                isAggregateRating={true}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starSpacing='5px'
                                name='rating'
                                />
                            </div>
                            <div className="episode-number">{cartItem.itemCourseChapters.length} Episodes</div>
                         </div>
                    </div>
                    <div className="old-price">
                        <h2>$57</h2>
                    </div>
                </div>
                <div className="cart-actions-and-valid-price mt-1">
                    <div className="cart-actions">
                       <Button className="cart-actions-btn mb-1" onClick={e => removeItem(cartItem.itemId)}>Remove</Button>
                       <Button className="cart-actions-btn mb-1">Save</Button>
                    </div>
                    <div className="cart-price">
                      <h2>${cartItem.itemPrice}</h2>
                    </div>
                </div>
         </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    removeItem: (itemId) => dispatch(removeFromCart(itemId))
})

export default connect(null, mapDispatchToProps)(CartItem)
