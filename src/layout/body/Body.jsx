import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import OrigamiContext from "../../context/origami/OrigamiContext";
import NotAuthenticated from "../../pages/errors/not-authenticated/NotAuthenticated";
import NotFound from "../../pages/errors/not-found/NotFound";
import Profile from "../../pages/registered/profile/Profile";
import Share from "../../pages/registered/share/Share";
import Home from "../../pages/shared/home/Home";
import Login from "../../pages/unregistered/login/Login";
import Register from "../../pages/unregistered/register/Register";

export const Body = () => {
  const origamiContext = useContext(OrigamiContext);
  const { isLoggedIn } = origamiContext;
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
        <Route exact path="/profile">
          {!isLoggedIn ? <Redirect to="/not-authenticated" /> : <Profile />}
        </Route>
        <Route exact path="/share">
          {!isLoggedIn ? <Redirect to="/not-authenticated" /> : <Share />}
        </Route>
        <Route path="/not-authenticated">
          <NotAuthenticated />
        </Route>
        <Route path="">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};
