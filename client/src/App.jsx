import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/ChatRooms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./components/ChatRoom";
import Chatio from "./pages/Chatio";
import ProtectedRoute from "./ProtectedRoute";
import Entry from "./pages/Entry";

function App(props) {
  const { isAuthenticated, setUser, setAthu, setLoader } = useContext(Context);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAthu(true);
        setLoader(false);
      })
      .catch((error) => {
        setUser({});
        setAthu(false);
        setLoader(false);
      });
  }, [isAuthenticated]);
  //        <Route path="/room/:roomId" element={<ChatRoom />} />
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Entry />} />
        <Route path="/home" element={<ChatRooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat/*"
          element={
            <ProtectedRoute>
              <Chatio />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
