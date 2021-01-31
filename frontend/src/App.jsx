import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/layout/landingPage/LandingPage";
import Navbar from "./components/layout/navbar/Navbar";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import NotFound from "./components/layout/notFound/NotFound";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashboard from "./components/dashboard/mainDashboard/Dashboard";
import setToken from "./utils/setToken";
import { loadUser } from "./store/actions/auth";
import Profiles from "./components/profiles/profiles/Profiles";
import Profile from "./components/profiles/profile/Profile";
import store from "./store/store";
import { Provider } from "react-redux";
import AddEducation from "./components/profileForms/profileEducation/AddEducation";
import Posts from "./components/posts/posts/Posts";
import Post from "./components/post/post/Post";

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    store.dispatch(loadUser());
    setShowChild(true);
  }, []);
  if (!showChild) return <div></div>;
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
            <PrivateRoute path="/profile/:id" exact component={Profile} />
            <PrivateRoute path="/profiles" exact component={Profiles} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
