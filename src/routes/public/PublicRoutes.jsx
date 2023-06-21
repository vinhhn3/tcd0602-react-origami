import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom";
import OrigamiContext from "../../context/origami/OrigamiContext";
import NotAuthenticated from "../../pages/errors/not-authenticated/NotAuthenticated";

import Home from "../../pages/shared/home/Home";
import Login from "../../pages/unregistered/login/Login";
import Register from "../../pages/unregistered/register/Register";
const PublicRoutes = () => {
  const origamiContext = useContext(OrigamiContext);
  const { isLoggedIn } = origamiContext;
  return (
    <>
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
      {/* <Route path="">
        <NotFound />
      </Route> */}
    </>
  );
};

export default PublicRoutes;
