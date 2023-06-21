import { useContext, useEffect, useReducer } from "react";
import OrigamiApi from "../../api/OrigamiApi";
import OrigamiContext from "../origami/OrigamiContext";
import { USER_LOGIN, USER_LOGOUT } from "../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = (props) => {
  const initialState = {
    isLoggedIn: false,
    userData: {},
  };

  const origamiContext = useContext(OrigamiContext);

  const [state, dispatch] = useReducer(AuthReducer, initialState, () => {
    const localState = localStorage.getItem("auth");
    return localState ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state));
  }, [state]);

  const loginUser = async (user) => {
    const response = await OrigamiApi.login(user);
    if (response.status === 200) {
      await origamiContext.getPrivatePosts();
      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });
    }
  };

  const logoutUser = async () => {
    const response = await OrigamiApi.logout();
    if (response.status === 200) {
      dispatch({
        type: USER_LOGOUT,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
