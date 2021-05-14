import { combineReducers } from "redux"
import loading from "./loading"
import auth from "./auth"
import school from "./school"

export default combineReducers({
    auth,
    loading,
    school
})