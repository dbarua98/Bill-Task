import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";


const NavigationBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="topnav">
          <Link to="/home" className="active">
            Customer
          </Link>
          <Link to="/category">Bill</Link>
          <Link className="split" onClick={handleLogout} to="/">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;