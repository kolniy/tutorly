import { LOAD_COURSE_UNIT } from "../actions/types"

const initialState = {
    unitDetails: null,
    loading: true
}

const courseUnitReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_COURSE_UNIT:
            return {
                ...state,
                unitDetails: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default courseUnitReducer