import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import "./styles/assets/vendor/nucleo/css/nucleo.css"
import "./styles/assets/css/argon-design-system-react.css"

import Homepage from "./components/Index"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </Router>
  )
}

export default App;
