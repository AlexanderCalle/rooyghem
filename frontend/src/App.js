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
import BackofficeCreateAlbum from './pages/BackofficeCreateAlbum';
import BackofficeAlbums from './pages/BackofficeAlbums';
import BackofficeAlbumPhoto from './pages/BackofficeAlbumPhoto';
import BackofficeAlbumChecker from './pages/BackofficeAlbumChecker';
import BackofficePhotoCheck from './pages/BackofficePhotoCheck';
import BackofficeAlbumUpdate from './pages/BackofficeAlbumUpdate';
import BackofficeTokshopItemsPage from './pages/BackofficeTokshopItems';
import BackofficeCreateTokshopitemPage from './pages/BackofficeCreateTokshopItem';
import BackofficeUpdateTokshopItemPage from './pages/BackofficeUpdateTokshopItem';
import BackofficeDeleteTokshopItemPage from './pages/BackofficeDeleteTokshopItem';
import AlbumPhotos from './pages/AlbumPhotos';
import UsersForgot from './pages/UsersForgot';
import UsersReset from './pages/UsersReset';
import TokshopOrderPage from './pages/TokshopOrderPage';

function App() {

  return (
    <Router>
      <body>
        <Switch>
          {/* Public routes */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/overons" component={AboutUs} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/groups/:group_name/info" component={Group} />
          <Route exact path="/groups" component={GroupList} />
          {/* User login/forgot */}
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/forgot" component={UsersForgot} />
          <Route exact path="/users/reset/:token" component={UsersReset} />
          {/* <Route exact path="/wafelbak" component={WafelbakOrderPage} /> */}
          <Route exact path="/albums/groups/:group_name/:album_id" component={AlbumPhotos} />
          {/* Backoffice */}
          <PrivateRoute exact path="/backoffice" component={BackofficePage} />
          {/* Backoffice Activities */}
          <PrivateRoute exact path="/backoffice/activities" component={BackofficeActivities} />
          <PrivateRoute exact path="/backoffice/activities/create" component={BackofficeCreateAct} />
          <PrivateRoute path="/backoffice/activities/delete/:activity_id" component={BackofficeActivityDelete} />
          <PrivateRoute path="/backoffice/activities/update/:activity_id" component={BackofficeUpdateAct} />
          {/* Backoffice Albums */}
          <PrivateRoute exact path="/backoffice/albums" component={BackofficeAlbums} />
          <PrivateRoute exact path="/backoffice/albums/create" component={BackofficeCreateAlbum} />
          <PrivateRoute exact path="/backoffice/albums/album/update/:album_id" component={BackofficeAlbumUpdate} />
          <PrivateRoute exact path="/backoffice/albums/album/:album_id" component={BackofficeAlbumPhoto} />
          {/* Backoffice VK */}
          <PrivateRoute exact path="/backoffice/vk" component={BackofficeVkPage} />
          {/* Backoffice Profile */}
          <PrivateRoute exact path="/backoffice/profile" component={BackofficeProfile} />
          <PrivateRoute exact path="/backoffice/profile/update" component={BackofficeUpdateProfile} />
          {/* Backoffice Admin Section */}
          {/* Backoffice Newsfeed (Admin) */}
          <AdminRoute exact path="/backoffice/newsfeed" component={BackofficeNewsfeed} />
          <AdminRoute exact path="/backoffice/newsfeed/create" component={BackofficeNewsfeedCreate} />
          <AdminRoute path="/backoffice/newsfeed/update/:newsfeed_id" component={BackofficeNewsfeedUpdate} />
          <AdminRoute path="/backoffice/newsfeed/delete/:newsfeed_id" component={BackofficeNewsfeedDelete} />
          {/* Backoffice Albums Checker (Admin) */}
          <AdminRoute exact path="/backoffice/albums/checker" component={BackofficeAlbumChecker} />
          <AdminRoute exact path="/backoffice/albums/check/:album_id" component={BackofficePhotoCheck} />
          {/* Backoffice Users (Admin) */}
          <AdminRoute exact path="/backoffice/users" component={BackofficeUsersPage} />
          <AdminRoute exact path="/backoffice/users/create" component={BackofficeUsersCreate} />
          <AdminRoute exact path="/backoffice/users/update/:user_id" component={BackofficeUsersUpdate} />
          <AdminRoute exact path="/backoffice/users/delete/:user_id" component={BackofficeUsersDelete} />
          {/* Backoffice All Activities (Admin) */}
          <AdminRoute exact path="/backoffice/activities/allactivities" component={BackofficeAllActivities} />
          {/* Backoffice All Vk (Admin) */}
          <AdminRoute exact path="/backoffice/vk/allvk" component={BackofficeAllVk} />
          <AdminRoute exact path="/backoffice/vk/allvk/update/:group_id" component={BackofficeAllVkUpdate} />
          {/* Backoffice Wafelbak Orders (Admin) */}
          <AdminRoute exact path="/backoffice/wafelbak/orders" component={BackofficeWafelbakPage} />
          {/*Backoffice tokshop items (Admin)*/}
          <AdminRoute exact path="/backoffice/tokshop/items" component={BackofficeTokshopItemsPage}/>
          <AdminRoute exact path="/backoffice/tokshop/items/create" component={BackofficeCreateTokshopitemPage}/>
          <AdminRoute path="/backoffice/tokshop/items/update/:item_id" component={BackofficeUpdateTokshopItemPage}/>
          <AdminRoute path="/backoffice/tokshop/items/delete/:item_id" component={BackofficeDeleteTokshopItemPage}/>
          {/** Tokshop order page */}
          <Route exact path = "/tokshop" component={TokshopOrderPage}/>
        </Switch>
      </body>
    </Router>
  );
}

export default App;
