import {
  GET_ALL_POSTS,
  GET_PRIVATE_POSTS,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userData: {},
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        publicPosts: action.payload,
      };
    case GET_PRIVATE_POSTS:
      return {
        ...state,
        privatePosts: action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
