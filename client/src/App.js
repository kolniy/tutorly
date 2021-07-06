import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import "./styles/assets/vendor/nucleo/css/nucleo.css"
import "./styles/assets/css/argon-design-system-react.css"

import Homepage from "./components/Index"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import Setpageone from "./components/account-setup/Setuppageone"
import Setpagetwo from "./components/account-setup/Setuppagetwo"
import CreateCourse from "./components/dashboard/create-courses/CreateCourse"
import Courses from "./components/dashboard/courses/Courses"
import Customize from "./components/dashboard/customize/Customize"
import ThemeInfo from "./components/dashboard/customize/ThemeSetupPages/ThemeInfo"
import ThemeUpload from "./components/dashboard/customize/ThemeSetupPages/ThemeUploads"
import ThemeContact from "./components/dashboard/customize/ThemeSetupPages/ThemeContact";
import Sales from "./components/dashboard/sales/Sales"
import Messages from "./components/dashboard/messages/Messages"
import AppLoader from "./components/layout/AppLoader"
import SchoolLandingPage from "./components/school/SchoolPage"

// theme preview components import
import Herotheme from "./themes/Hero-type-theme/LandingPage"

//
// routing 
import PrivateRoute from "./components/routers/PrivateRoute"
import PrivateRouteForToken from "./components/routers/PrivateRouteForToken"

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
        <Route exact path="/:schoolname" component={SchoolLandingPage} />
        <PrivateRouteForToken exact path="/account/setup/stepone" component={Setpageone} />
        <PrivateRouteForToken exact path="/account/setup/steptwo" component={Setpagetwo} />
        <PrivateRoute exact path="/dashboard/createcourse" component={CreateCourse} />
        <PrivateRoute exact path="/dashboard/courses" component={Courses} />
        <PrivateRoute exact path="/dashboard/customize" component={Customize} />
        <PrivateRoute exact path="/dashboard/customize/theme/setup/themeinfo" component={ThemeInfo} />
        <PrivateRoute exact path="/dashboard/customize/theme/setup/assetupload" component={ThemeUpload} />
        <PrivateRoute exact path="/dashboard/customize/theme/setup/contactinfo" component={ThemeContact} />
        <PrivateRoute exact path="/dashboard/sales" component={Sales} />
        <PrivateRoute exact path="/dashboard/messages" component={Messages} />
        <PrivateRoute exact path="/dashboard/themes/preview/hero" component={Herotheme} />
      </Switch>
    </Router>
   </Provider>
  )
}

export default App;
