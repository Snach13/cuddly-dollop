import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

import LogoutButton from "./LogoutButton";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  let username = "";

  if (cookies.access_token) {
    const decoded = jwt_decode(cookies.access_token);
    username = decoded.username;
  }

  return (
    <>
      {cookies.access_token && (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" className="font-semibold text-xl tracking-tight">
              My Application
            </Link>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link
                to="/listening-level"
                className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4 ${
                  location.pathname === "/listening-level" ? "underline" : ""
                }`}
              >
                Listening Level
              </Link>
              <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                {username}
              </div>
              <Link
                to="/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
              >
                <LogoutButton />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
