import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Group from './pages/Group';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import BackofficePage from './pages/Backoffice';
import BackofficeActivities from './pages/BackofficeActivities';
import BackofficeCreateAct from './pages/BackofficeCreateAct';
import BackofficeUpdateAct from './pages/BackofficeUpdateAct';
import BackofficeVkPage from './pages/BackofficeVk';

function App() {
  return (
    <Router>
      <body>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/overons" component={AboutUs} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/groups/:group_name/info" component={Group}/>
          <Route exact path="/users/login" component={Login}/>
          <PrivateRoute exact path="/backoffice" component={BackofficePage}/>
          <PrivateRoute exact path="/backoffice/activities" component ={BackofficeActivities}/>
          <PrivateRoute exact path="/backoffice/activities/create" component ={BackofficeCreateAct}/>
          <PrivateRoute path="/backoffice/activities/update/:activity_id" component={BackofficeUpdateAct} />
          <PrivateRoute exact path="/backoffice/vk" component={BackofficeVkPage} />
        </Switch>
      </body>
    </Router>
  );
}

export default App;
