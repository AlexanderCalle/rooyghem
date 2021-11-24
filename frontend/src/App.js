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
import BackofficeProfile from './pages/BackofficeProfile';
import BackofficeUpdateProfile from './pages/BackofficeUpdateProfile';
import AdminRoute from './AdminRoute';
import BackofficeNewsfeed from './pages/BackofficeNewsfeed';
import BackofficeNewsfeedCreate from './pages/BackofficeNewsfeedCreate';
import BackofficeNewsfeedUpdate from './pages/BackofficeNewsfeedUpdate';
import BackofficeNewsfeedDelete from './pages/BackofficeNewsfeedDelete';
import BackofficeUsersPage from './pages/BackofficeUsers';
import BackofficeUsersDelete from './pages/BackofficeUsersDelete';
import BackofficeActivityDelete from './pages/BackofficeDeleteActivity';
import BackofficeUsersCreate from './pages/BackofficeUsersCreate';
import BackofficeUsersUpdate from './pages/BackofficeUsersUpdate';
import BackofficeAllActivities from './pages/BackofficeAllActivities';
import BackofficeAllVk from './pages/BackofficeAllVk';
import BackofficeAllVkUpdate from './pages/BackofficeAllVkUpdate';
import BackofficeWafelbakPage from './pages/BackofficeWafelbak';
import WafelbakOrderPage from './pages/WafelbakOrderPage';
import GroupList from './pages/GroupsList';

function App() {
  return (
    <Router>
      <body>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/overons" component={AboutUs} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/groups/:group_name/info" component={Group} />
          <Route exact path="/groups" component={GroupList} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/wafelbak" component={WafelbakOrderPage} />
          <PrivateRoute exact path="/backoffice" component={BackofficePage} />
          <PrivateRoute exact path="/backoffice/activities" component={BackofficeActivities} />
          <PrivateRoute exact path="/backoffice/activities/create" component={BackofficeCreateAct} />
          <PrivateRoute path="/backoffice/activities/delete/:activity_id" component={BackofficeActivityDelete} />
          <PrivateRoute path="/backoffice/activities/update/:activity_id" component={BackofficeUpdateAct} />
          <PrivateRoute exact path="/backoffice/vk" component={BackofficeVkPage} />
          <PrivateRoute exact path="/backoffice/profile" component={BackofficeProfile} />
          <PrivateRoute exact path="/backoffice/profile/update" component={BackofficeUpdateProfile} />
          <AdminRoute exact path="/backoffice/newsfeed" component={BackofficeNewsfeed} />
          <AdminRoute exact path="/backoffice/newsfeed/create" component={BackofficeNewsfeedCreate} />
          <AdminRoute path="/backoffice/newsfeed/update/:newsfeed_id" component={BackofficeNewsfeedUpdate} />
          <AdminRoute path="/backoffice/newsfeed/delete/:newsfeed_id" component={BackofficeNewsfeedDelete} />
          <AdminRoute exact path="/backoffice/users" component={BackofficeUsersPage} />
          <AdminRoute exact path="/backoffice/users/create" component={BackofficeUsersCreate} />
          <AdminRoute exact path="/backoffice/users/update/:user_id" component={BackofficeUsersUpdate} />
          <AdminRoute exact path="/backoffice/users/delete/:user_id" component={BackofficeUsersDelete} />
          <AdminRoute exact path="/backoffice/activities/allactivities" component={BackofficeAllActivities} />
          <AdminRoute exact path="/backoffice/vk/allvk" component={BackofficeAllVk} />
          <AdminRoute exact path="/backoffice/vk/allvk/update/:group_id" component={BackofficeAllVkUpdate} />
          <AdminRoute exact path="/backoffice/wafelbak/orders" component={BackofficeWafelbakPage} />
        </Switch>
      </body>
    </Router>
  );
}

export default App;
