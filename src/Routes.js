import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AppliedRoute from './components/AppliedRoute'
import Login from './containers/Login'
import Signup from "./containers/Signup";
import NewCourse from './containers/NewCourse'
import Courses from "./containers/Courses";
import Settings from "./containers/Settings";
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


const Routes = ({ appProps }) => {
  return (
    <Switch>
      <AppliedRoute appProps={appProps} path="/" exact component={Home} />
      <UnauthenticatedRoute appProps={appProps} path="/login" exact component={Login} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/courses/new" exact component={NewCourse} appProps={appProps} />
      <AuthenticatedRoute path="/courses/:id" exact component={Courses} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />

      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes
