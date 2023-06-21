import { useEffect, useReducer } from "react";
import OrigamiApi from "../../api/OrigamiApi";
import { GET_ALL_POSTS, GET_PRIVATE_POSTS } from "../types";
import OrigamiContext from "./OrigamiContext";
import OrigamiReducer from "./OrigamiReducer";

const OrigamiState = (props) => {
  const initialState = {
    publicPosts: [],
    privatePosts: [],
  };

  const [state, dispatch] = useReducer(OrigamiReducer, initialState, () => {
    const localState = localStorage.getItem("origami");
    return localState ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("origami", JSON.stringify(state));
  }, [state]);

  const getPrivatePosts = async () => {
    const response = await OrigamiApi.getMyPosts();
    dispatch({
      type: GET_PRIVATE_POSTS,
      payload: response.data,
    });
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

  const clearPrivatePosts = () => {
    dispatch({
      type: GET_PRIVATE_POSTS,
    });
  };

  return (
    <OrigamiContext.Provider
      value={{
        publicPosts: state.publicPosts,
        privatePosts: state.privatePosts,
        getPublicPosts,
        submitPost,
        getPrivatePosts,
        clearPrivatePosts,
      }}
    >
      {props.children}
    </OrigamiContext.Provider>
  );
};

export default OrigamiState;
