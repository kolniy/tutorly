import axios from "axios"
import { GET_SCHOOL, UPDATE_SCHOOL_THEME } from "./types"
import { startLoading, stopLoading } from "./appLoading"
import setAuthToken from "../utilities/setAuthToken"

export const getDefaultSchool = () => {
    return async (dispatch) => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/v1/school/')
            dispatch({
                type: GET_SCHOOL,
                payload: res.data
            })
        } catch (error) {
            const errors = error.response.data.errors
            errors.forEach(element => {
                alert(element.msg)
            });
        }
    }
}

export const updateSchoolTheme = (themeid) => {
    return async (dispatch) => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
           dispatch(startLoading())
           const res = await axios.put(`/api/v1/school/theme/${themeid}`)
           dispatch({
               type: UPDATE_SCHOOL_THEME,
               payload: res.data
           })
           dispatch(stopLoading())
        } catch (error) {
            const errors = error.response.data.errors
            errors.forEach(element => {
                alert(element.msg)
            });
        }
    }
}