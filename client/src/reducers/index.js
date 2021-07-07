import { combineReducers } from "redux"
import loading from "./loading"
import auth from "./auth"
import school from "./school"
import currentPage from "./currentDashboardPage"
import theme from "./theme"

export default combineReducers({
    auth,
    loading,
    school,
    currentPage,
    theme
})