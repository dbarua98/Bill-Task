import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://reacttestprojectapi.azurewebsites.net/api/UserManagement/AuthenticateUser?UserName=${email}&Password=${password}`
      )
      .then((response) => {
        const token = response.data.authToken;

        localStorage.setItem("token", token);
        navigate("/home");
      })
      .catch((error) => {
        setLoginError(true);
        console.error(error);
      });
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: "white", textAlign: "center" }}>Login</h1>
          <div className="container">
            <label htmlFor="uname">
              <b style={{ color: "white" }}>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="uname"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="psw">
              <b style={{ color: "white" }}>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </div>
          {loginError && (
            <p className="login-error">
              Invalid credentials. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
