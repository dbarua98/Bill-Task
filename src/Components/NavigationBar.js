import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [token]);

  const handleToLogout = () => {
    localStorage.removeItem("token");
    setIsToken(false);
    navigate("/");
  };

  return (
    <div>
      {isToken && (
        <div className="topnav">
          <Link to="/home" className="active">
            Customer
          </Link>
          <Link to="/bill">Bill</Link>
          <Link className="split" onClick={handleToLogout} to="/">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
