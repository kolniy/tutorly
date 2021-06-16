import axios from "axios"
import { SIGNUP_SUCCESS, SIGNIN_SUCCESS, SIGNUP_FAIL, SIGNIN_FAIL, LOAD_USER, AUTH_ERROR, LOGOUT } from "./types"
import { startLoading, stopLoading } from "./appLoading"
import setAuthToken from "../utilities/setAuthToken"

export const loadUser = () => {
    return async (dispatch) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
          }
        try {
            const res = await axios.get('/api/v1/user/me')
            dispatch({
                type: LOAD_USER,
                payload: res.data
            })
        } catch (error) {
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(error => {
                   alert(error.msg)
                });
            }
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

export const signUp = ({ email, password }, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({ email, password})
        try {
            dispatch(startLoading())
            const res = await axios.post('/api/v1/user/signup', body, config)
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            })
            dispatch(stopLoading())
            dispatch(loadUser())
            history.push('/account/setup/stepone')
        } catch (error) {
            console.log(error)
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(error => {
                   alert(error.msg)
                });
            }
            dispatch(stopLoading())
            dispatch({
                type: SIGNUP_FAIL 
            })
        }
    }
}

export const signIn = ({ email, password }, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({ email, password})
        try {
            dispatch(startLoading())
            const res = await axios.post('/api/v1/user/signin', body, config)
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: res.data
            })
            dispatch(stopLoading())
            dispatch(loadUser())
            history.push('/dashboard/customize')
        } catch (error) {
            console.log(error)
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(error => {
                   alert(error.msg)
                });
            }
            dispatch(stopLoading())
            dispatch({
                type: SIGNIN_FAIL 
            })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        })
    }
}