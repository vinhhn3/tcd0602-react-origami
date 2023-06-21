import React, { useContext } from "react";
import BirdFooter from "../../assets/blue-origami-bird-flipped.png";
import BirdNavbar from "../../assets/white-origami-bird.png";
import OrigamiContext from "../../context/origami/OrigamiContext";
import LinkItem from "./LinkItem";

const Links = ({ logo }) => {
  const origamiContext = useContext(OrigamiContext);
  const { isLoggedIn } = origamiContext;

  return (
    <ul>
      {logo === "navbar" && <img src={BirdNavbar} />}
      <LinkItem url="/" title="Home" />
      {isLoggedIn ? (
        <>
          <LinkItem url="/share" title="Share" />
          <LinkItem url="/profile" title="Profile" />
        </>
      ) : (
        <>
          <LinkItem url="/login" title="Login" />
          <LinkItem url="/register" title="Register" />
        </>
      )}
      {logo === "footer" && <img src={BirdFooter} />}
    </ul>
  );
};

export default Links;
