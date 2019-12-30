import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AppliedRoute from './components/AppliedRoute'
import Login from './containers/Login'
import Signup from "./containers/Signup";
import NewNote from './containers/NewNote'
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


const Routes = ({ appProps }) => {
  return (
    <Switch>
      <AppliedRoute appProps={appProps} path="/" exact component={Home} />
      <UnauthenticatedRoute appProps={appProps} path="/login" exact component={Login} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
      <AuthenticatedRoute path="/notes/:id" exact component={Notes} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />

      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes
