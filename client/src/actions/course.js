import axios from "axios"
import { CREATE_COURSE, ADD_COURSE_MODULE, LOAD_COURSE } from "./types"
import { startLoading, stopLoading } from "./appLoading"
import setAuthToken from "../utilities/setAuthToken"

export const createNewCourse = (courseDetails, schoolId, history, routeTo) => {
    return async (dispatch) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify(courseDetails)
        dispatch(startLoading())
        try {
            const res = await axios.post(`/api/v1/course/${schoolId}`, body, config)
            dispatch({
                type: CREATE_COURSE,
                payload: res.data
            })
         dispatch(stopLoading())   
         history.push(routeTo)   
        } catch (error) {
            dispatch(stopLoading())   
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert(element.msg)
                });
            }
        }
    }
}

export const addCourseModule = (moduleName, courseId) => {
    return async (dispatch) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify(moduleName)
        dispatch(startLoading())
        try {
            const res = await axios.post(`/api/v1/coursechapter/${courseId}`, body, config)
            dispatch({
                type: ADD_COURSE_MODULE,
                payload: res.data
            })
         dispatch(stopLoading())   
        } catch (error) {
            dispatch(stopLoading())   
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert(element.msg)
                });
            }
        }
    }
}

export const getCourseById = (courseId) => {
    return async (dispatch) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        try {
            const res = await axios.get(`/api/v1/course/${courseId}`)
            dispatch({
                type: LOAD_COURSE,
                payload: res.data
            })
         dispatch(stopLoading())   
        } catch (error) {
            dispatch(stopLoading())   
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert(element.msg)
                });
            }
        }
    }
}