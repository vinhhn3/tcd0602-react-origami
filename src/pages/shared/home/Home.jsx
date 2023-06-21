import React, { useContext, useEffect } from "react";
import Posts from "../../../components/posts/Posts";
import OrigamiContext from "../../../context/origami/OrigamiContext";

const Home = () => {
  const origamiContext = useContext(OrigamiContext);
  const { publicPosts } = origamiContext;
  useEffect(() => {
    origamiContext.getPublicPosts();
  }, []);
  return (
    <>
      <div className="Main">
        <h1>Soooooooooooooooome Heading</h1>
        <Posts posts={publicPosts} />
      </div>
    </>
  );
};

export default Home;
