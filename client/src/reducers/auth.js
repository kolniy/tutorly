import { 
    SIGNUP_SUCCESS,
    SIGNIN_SUCCESS,
    SIGNUP_FAIL, 
    SIGNIN_FAIL,
    LOAD_USER,
    AUTH_ERROR, 
    LOGOUT 
} from "../actions/types"

const initialState = {
    token: null,
    authenticated: false,
    loading: true,
    user: null
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:    
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                authenticated: true,
                loading: false,
                token: payload.token
            }
        case SIGNUP_FAIL:
        case AUTH_ERROR:
        case SIGNIN_FAIL:
        case LOGOUT:            
            localStorage.removeItem("token") 
            return {
                ...state,
                authenticated: false,
                loading: false,
                token: null,
                user: null
            }  
        case LOAD_USER:
            return {
                ...state,
                authenticated:true,
                loading:false,
                user: payload
            }  
        default:
           return state
    }
}

export default authReducer