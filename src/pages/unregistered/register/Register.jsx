import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";

const Register = () => {
  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;
  const [registerInput, setRegisterInput] = useState({
    username: "",
    password: "",
    re_password: "",
  });
  let history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(registerInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerInput.password !== registerInput.re_password) {
      alert("Passwords don't match");
    } else {
      console.log(registerInput);
      await registerUser(registerInput);
      history.push("/profile");
    }
  };

  return (
    <>
      <div className="Main">
        <div className="Register">
          <h1>Register Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>Email</label>
              <input
                type="email"
                name="username"
                value={registerInput.username}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={registerInput.password}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <label>Re-password</label>
              <input
                type="password"
                name="re_password"
                value={registerInput.re_password}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
