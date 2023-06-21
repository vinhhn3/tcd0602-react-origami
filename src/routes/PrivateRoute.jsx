import { useContext } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;
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
