import { CREATE_COURSE, ADD_COURSE_MODULE, LOAD_COURSE } from "../actions/types";

const initialState = {
    loading: true,
    courseDetails: null,
    coursemodules: []
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
        case ADD_COURSE_MODULE: 
            return {
                ...state,
                loading: false,
                coursemodules: [
                    ...state.coursemodules,
                    payload
                ]
            }    
        default:
            return state
    }
}

export default courseReducer