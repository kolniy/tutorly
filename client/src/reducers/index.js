import { combineReducers } from "redux"
import loading from "./loading"
import auth from "./auth"
import school from "./school"
import currentPage from "./currentDashboardPage"
import theme from "./theme"
import course from "./course"
import modules from "./modules"
import courseunit from "./courseunit"

export default combineReducers({
    auth,
    loading,
    school,
    currentPage,
    theme,
    course,
    modules,
    courseunit
})