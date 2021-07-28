import { CREATE_COURSE, LOAD_COURSE } from "../actions/types";

const initialState = {
    loading: true,
    courseDetails: null
}

const courseReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case CREATE_COURSE:
        case LOAD_COURSE:    
            return {
                ...state,
                loading: false,
                courseDetails: payload
            }     
        default:
            return state
    }
}

export default courseReducer