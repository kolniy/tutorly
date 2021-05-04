import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';


import "./styles/assets/vendor/nucleo/css/nucleo.css"
import "./styles/assets/css/argon-design-system-react.css"

import Homepage from "./components/Index"

function App() {
  return <>
    <Router>
      <Switch>
        <Route to="/" component={Homepage}></Route>
      </Switch>
    </Router>
  </>;
}

export default App;
