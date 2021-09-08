import { ADD_COURSE_TO_CART, REMOVE_COURSE_FROM_CART, CLEAR_CART } from "./types";

const loadCart = () => {
    return JSON.parse(localStorage.getItem("cartList") || "[]")
}

let cartList = []

export const addToCart = ({ _id, thumbnail, title, price }) => {
    return (dispatch) => {
        const cartItem = {
            itemId: _id,
            itemImg: thumbnail,
            itemName: title,
            itemPrice: price,
        }

        cartList = loadCart()
        cartList.push(cartItem)
        localStorage.setItem("cartList", JSON.stringify(cartList))
        dispatch({
            type: ADD_COURSE_TO_CART,
            payload: cartItem
        })
    }
}

export const removeFromCart = (id) => {
    return (dispatch) => {
        cartList = loadCart()
        cartList = cartList.filter((cartItem) => cartItem.itemId !== id)
        localStorage.setItem("cartList", JSON.stringify(cartList))
        dispatch({
            type: REMOVE_COURSE_FROM_CART,
            payload: id
        })
    }
}

export const clearCart = () => {
    return (dispatch) => {
        localStorage.removeItem("cartList")
        dispatch({
            type: CLEAR_CART
        })
    }
}