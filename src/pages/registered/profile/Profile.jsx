import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import logo from "../../../assets/logo.svg";
import Posts from "../../../components/posts/Posts";
import AuthContext from "../../../context/auth/AuthContext";
import OrigamiContext from "../../../context/origami/OrigamiContext";

const Profile = () => {
  const origamiContext = useContext(OrigamiContext);
  const authContext = useContext(AuthContext);
  const { userData, isLoggedIn, logoutUser } = authContext;
  const { privatePosts } = origamiContext;
  let history = useHistory();

  const onLogout = async () => {
    await logoutUser();
    if (!isLoggedIn) {
      history.push("/");
    }
  };
  return (
    <>
      <div className="Main">
        <div className="Profile">
          <img src={logo} />
          <div className="personal-info">
            <p>
              <span>Email:</span>
              {userData.username}
            </p>
            <p>
              <span>Posts:</span>
              {privatePosts.length}
            </p>
          </div>
          <div>
            <h2>3 of your recent posts</h2>
            <Posts posts={privatePosts.slice(-3).reverse()} />
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
