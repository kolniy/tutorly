import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import "./styles/assets/vendor/nucleo/css/nucleo.css"
import "./styles/assets/css/argon-design-system-react.css"

import Homepage from "./components/Index"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import Setpageone from "./components/account-setup/Setuppageone"
import Setpagetwo from "./components/account-setup/Setuppagetwo"
import CreateCourse from "./components/dashboard/CreateCourse"
import Courses from "./components/dashboard/Courses"
import Customize from "./components/dashboard/Customize"
import Sales from "./components/dashboard/Sales"
import Messages from "./components/dashboard/Messages"
import AppLoader from "./components/layout/AppLoader"

// REDUX STORE CONFIG
import { Provider } from "react-redux"
import store from "./store"
// import { loadUser } from "./actions/auth"
import setAuthToken from "./utilities/setAuthToken"

if(localStorage.getItem("token")){
  setAuthToken(localStorage.getItem("token"))
}


function App() {

  //  useEffect(() => {
  //   store.dispatch(loadUser()) // load user when app mounts, checks for authentication
  // }, [])

  return (
   <Provider store={store}>
      <Router>
        <AppLoader />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/account/setup/stepone" component={Setpageone} />
        <Route exact path="/account/setup/steptwo" component={Setpagetwo} />
        <Route exact path="/dashboard/createcourse" component={CreateCourse} />
        <Route exact path="/dashboard/courses" component={Courses} />
        <Route exact path="/dashboard/customize" component={Customize} />
        <Route exact path="/dashboard/sales" component={Sales} />
        <Route exact path="/dashboard/messages" component={Messages} />
      </Switch>
    </Router>
   </Provider>
  )
}

export default App;
