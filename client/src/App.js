import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";



function App() {

  const { user } = useContext(AuthContext);

  const [googleUser, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8800/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <BrowserRouter>
        <Routes>
          {/* user ? <Home /> : <Register /> */}
          <Route path="/" element={user || googleUser ? <Home /> : <Login />}/>
          <Route path="/login" element={user || googleUser ? <Navigate to="/" /> : <Login/>}/>
          <Route path="/register" element={user || googleUser ? <Navigate to="/" /> : <Register />}/>
          <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger/>}/>
          <Route path="/profile/:username" element={<Profile />} /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
