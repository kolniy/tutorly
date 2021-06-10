import { UPDATE_DASHBOARD_PAGE_COUNTER, UPDATE_DASHBOARD_PAGE_COUNTER_TO_DEFAULT } from "../actions/types"

const initialState = {
    counter: 2
}

const currentDashboardCounterReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case UPDATE_DASHBOARD_PAGE_COUNTER:
           return {
               ...state,
               counter: payload
           }
        case UPDATE_DASHBOARD_PAGE_COUNTER_TO_DEFAULT:
            return {
                ...state,
                counter: 2
            }
        default:
            return state;
    }
}

export default currentDashboardCounterReducer