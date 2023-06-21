import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom";
import OrigamiContext from "../../context/origami/OrigamiContext";
import Profile from "../../pages/registered/profile/Profile";
import Share from "../../pages/registered/share/Share";

const PrivateRoutes = () => {
  const origamiContext = useContext(OrigamiContext);
  const { isLoggedIn } = origamiContext;
  return (
    <>
      <Route exact path="/profile">
        {!isLoggedIn ? <Redirect to="/not-authenticated" /> : <Profile />}
      </Route>
      <Route exact path="/share">
        {!isLoggedIn ? <Redirect to="/not-authenticated" /> : <Share />}
      </Route>
    </>
  );
};

export default PrivateRoutes;
