import { useContext } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom";
import OrigamiContext from "../context/origami/OrigamiContext";

const PrivateRoute = ({ children, ...rest }) => {
  const origamiContext = useContext(OrigamiContext);
  const { isLoggedIn } = origamiContext;
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn === true ? (
          children
        ) : (
          <Redirect to="/not-authenticated" />
        );
      }}
    />
  );
};

export default PrivateRoute;
