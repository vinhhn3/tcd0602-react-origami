import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import OrigamiContext from "../../context/origami/OrigamiContext";
import NotAuthenticated from "../../pages/errors/not-authenticated/NotAuthenticated";
import NotFound from "../../pages/errors/not-found/NotFound";

import Profile from "../../pages/registered/profile/Profile";
import Share from "../../pages/registered/share/Share";

import AuthContext from "../../context/auth/AuthContext";
import Account from "../../pages/admin/Account";
import Home from "../../pages/shared/home/Home";
import Login from "../../pages/unregistered/login/Login";
import Register from "../../pages/unregistered/register/Register";
import PrivateRoute from "../../routes/PrivateRoute";

export const Body = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;
  return (
    <div className="Main">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/not-authenticated">
          <NotAuthenticated />
        </Route>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/share">
          <Share />
        </PrivateRoute>
        <Route exact path="/admin">
          <Account />
        </Route>
        <Route path="">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};
