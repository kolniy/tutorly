import { UPDATE_DASHBOARD_PAGE_COUNTER } from "../actions/types"

const initialState = {
    currentPage: 2
}

const currentDashboardCounterReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case UPDATE_DASHBOARD_PAGE_COUNTER:
           return {
               ...state,
               currentPage: payload
           }
    
        default:
            return state;
    }
}

export default currentDashboardCounterReducer