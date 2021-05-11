import axios from "axios"
import {
    UPDATE_ACCOUNT_STEP_ONE,
    UPDATE_ACCOUNT_STEP_TWO,
    UPDATE_ACCOUNT_STEP_ONE_FAIL,
    UPDATE_ACCOUNT_STEP_TWO_FAIL
} from "../actions/types"
import { startLoading, stopLoading } from "./appLoading"
import setAuthToken from "../utilities/setAuthToken"

export const accountSetupOne = ({ firstname, lastname, username }, history ) => {
    return async (dispatch) => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({ firstname, lastname, username })
       try {
            dispatch(startLoading())
            const res = await axios.put('/api/v1/user/account/setup/stepone', body, config)
            dispatch({
                type: UPDATE_ACCOUNT_STEP_ONE,
                payload: res.data.user
            })
            dispatch(stopLoading())
            history.push('/account/setup/steptwo')
        } catch (error) {
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(error => {
                   alert(error.msg)
                });
            }
            dispatch(({
                type: UPDATE_ACCOUNT_STEP_ONE_FAIL
            }))
        }
    }
}

export const accountSetupTwo = ({ field, about }, history ) => {
    return async (dispatch) => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({ field, about })
       try {
            dispatch(startLoading())
            const res = await axios.put('/api/v1/user/account/setup/steptwo', body, config)
            dispatch({
                type: UPDATE_ACCOUNT_STEP_TWO,
                payload: res.data.user
            })
            dispatch(stopLoading())
            history.push('/dashboard/createcourse')
        } catch (error) {
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(error => {
                   alert(error.msg)
                });
            }
            dispatch(({
                type: UPDATE_ACCOUNT_STEP_TWO_FAIL
            }))
        }
    }
}