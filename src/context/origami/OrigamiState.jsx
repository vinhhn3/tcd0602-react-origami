import { useEffect, useReducer } from "react";
import OrigamiApi from "../../api/OrigamiApi";
import {
  GET_ALL_POSTS,
  GET_PRIVATE_POSTS,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";
import OrigamiContext from "./OrigamiContext";
import OrigamiReducer from "./OrigamiReducer";

const OrigamiState = (props) => {
  const initialState = {
    // isLoggedIn: false,
    publicPosts: [],
    // userData: {},
    privatePosts: [],
  };

  const [state, dispatch] = useReducer(OrigamiReducer, initialState, () => {
    const localState = localStorage.getItem("origami");
    return localState ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("origami", JSON.stringify(state));
  }, [state]);

  const loginUser = async (user) => {
    const response = await OrigamiApi.login(user);
    if (response.status === 200) {
      await getPrivatePosts();
      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });
    }
  };

  const getPrivatePosts = async () => {
    const response = await OrigamiApi.getMyPosts();
    dispatch({
      type: GET_PRIVATE_POSTS,
      payload: response.data,
    });
  };

  const logoutUser = async () => {
    const response = await OrigamiApi.logout();
    if (response.status === 200) {
      dispatch({
        type: USER_LOGOUT,
      });
    }
  };

  const getPublicPosts = async () => {
    const posts = await OrigamiApi.getAllPosts(5);
    dispatch({
      type: GET_ALL_POSTS,
      payload: posts.data,
    });
  };

  const submitPost = async (text) => {
    const response = await OrigamiApi.createPost(text);
    if (response.status === 200) {
      await getPrivatePosts();
    }
  };

  const registerUser = async (user) => {
    const response = await OrigamiApi.register(user);
    if (response.status === 200) {
      await loginUser({ username: user.username, password: user.password });
    }
  };

  return (
    <OrigamiContext.Provider
      value={{
        // isLoggedIn: state.isLoggedIn,
        publicPosts: state.publicPosts,
        // userData: state.userData,
        privatePosts: state.privatePosts,
        // loginUser,
        logoutUser,
        getPublicPosts,
        submitPost,
        registerUser,
        getPrivatePosts,
      }}
    >
      {props.children}
    </OrigamiContext.Provider>
  );
};

export default OrigamiState;
