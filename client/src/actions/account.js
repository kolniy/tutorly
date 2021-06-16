import axios from "axios"
import {
    UPDATE_ACCOUNT_STEP_ONE,
    UPDATE_ACCOUNT_STEP_TWO,
    UPDATE_ACCOUNT_STEP_TWO_FAIL
} from "../actions/types"
import { startLoading, stopLoading } from "./appLoading"
import setAuthToken from "../utilities/setAuthToken"

export const accountSetupOne = ({ firstname, lastname, username }, history ) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const payload = {
            firstname,
            lastname,
            username
        }
        dispatch({
          type: UPDATE_ACCOUNT_STEP_ONE,
             payload
         }) 
        dispatch(stopLoading())
        history.push('/account/setup/steptwo')  
    }
}

export const accountSetupTwo = ({ field, about }, history ) => {
    return async (dispatch, getState) => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({
        ...getState().auth.user,
        field,
        about
        })

        try {
        dispatch(startLoading())
        const res = await axios.put('/api/v1/user/account/setup/stepcomplete', body, config)
           dispatch({
             type: UPDATE_ACCOUNT_STEP_TWO,
              payload: res.data.user
            })
           // dispatch to add the school data to the state
            dispatch(stopLoading())
            history.push('/dashboard/customize')
        } catch (error) {
            const errors = error.response.data.errors
            errors.forEach(error => {
               alert(error.msg)
             });
           dispatch({
            type: UPDATE_ACCOUNT_STEP_TWO_FAIL
          })
            console.log(errors)
        }
    }
}
