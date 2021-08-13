import axios from "axios"
import setAuthToken from "../utilities/setAuthToken"
import { LOAD_COURSE_UNIT } from "./types"

export const loadCourseUnit = (courseunitId) => {
    return async (dispatch) => {
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        try {
            const res = await axios.get(`/api/v1/courseunit/${courseunitId}`)
            dispatch({
                type: LOAD_COURSE_UNIT,
                payload: res.data
            })
        } catch (error) {
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(element => {
                    alert(element.msg)
                });
            }
        }
    }
}
