import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const dummyUsers = [
    { email: "dummyuser@gmail.com", password: "12345" },

  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = axios.post(`https://reacttestprojectapi.azurewebsites.net/api/UserManagement/AuthenticateUser?UserName=${email}&Password=${password}`)
    .then((response) => {
      // console.log(response);
      const token = response.data.authToken;

      // Set the token in local storage
      localStorage.setItem('token', token);
      navigate('/home')
      handleLogin();
    })
    .catch((error) => {
      console.error(error);
    });
  

    if (user) {
      console.log("Successful login!");
      setLoginError(false);
      setEmail("");
      setPassword("");
      navigate("/home");
      handleLogin();
    } else {
      console.log("Invalid credentials!");
      setLoginError(true);
      setPassword("");
    }
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit} >
          <h1 style={{color:"white" , textAlign:"center"}}>Login</h1>
          <div className="container">
            <label htmlFor="uname">
              <b style={{color:"white"}}>Email</b>
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
              <b style={{color:"white"}}>Password</b>
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
            <p className="login-error" >Invalid credentials. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

