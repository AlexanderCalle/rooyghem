import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Group from './pages/Group';

function App() {
  return (
    <Router>
      <body>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/overons" component={AboutUs} />
          <Route exact path="/contact" component={Contact} />
          <Route path="/groups/:group_name/info" component={Group}/>
        </Switch>
      </body>
    </Router>
  );
}

export default App;
