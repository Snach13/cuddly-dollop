import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Home from "./pages/Home";
import { Navbar } from "./component/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import { useState } from "react";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Home } from "./pages/Home";
// import { Login } from "./pages/Login";
// import { Register } from "./pages/Register";
// import { Navbar } from "./components/Navbar";
// import { useCookies } from "react-cookie";
// import { navigate } from "react-router-dom";

// function App() {
//   const [cookies, setCookies] = useCookies(["access_token"]);
//   const [loggedIn, setLoggedIn] = useState(!!cookies.access_token);

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setCookies("access_token", "", { path: "/" });
//     window.localStorage.removeItem("userID");
//     navigate("/login");
//   };

//   return (
//     <>
//       <BrowserRouter>
//         {loggedIn && <Navbar onLogout={handleLogout} />}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
