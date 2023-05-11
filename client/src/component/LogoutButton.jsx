import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
