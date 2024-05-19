import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FaUserLarge } from "react-icons/fa6";
import { CiLogout, CiCalendar } from "react-icons/ci";
import Createroom from "../components/Createroom.jsx";
import { Context, server } from "../main";
import toast from "react-hot-toast";
function ChatRooms() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { setRoomsData, user, isAuthenticated, setAthu } = useContext(Context);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${server}/rooms/allrooms`, {
          withCredentials: true,
        });
        setRooms(data);
        setRoomsData(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [setRoomsData]);
  const logOutHandler = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const x = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      console.log(x);
      toast.success("Logged Out Successfully");
      setAthu(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setAthu(false);
      console.log(true);
    }
  };
  function openModal() {
    setShowModal(true);
  }
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar for large screens */}
      <div className="hidden md:block md:w-1/4 bg-gray-800 p-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            {user.image ? (
              <img
                src={user.image}
                alt="User"
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <FaUserLarge className="w-24 h-24 text-gray-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-400">{user.email}</p>
          <p className="flex items-center mt-2">
            <CiCalendar className="mr-2" />
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="flex items-center mt-2 text-green-500">{user.status}</p>
          <button
            className="flex items-center mt-4 bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out"
            onClick={logOutHandler}
          >
            <CiLogout className="mr-2" />
            Logout
          </button>
        </div>
      </div>

   
      <div className="flex-1 p-8">
        {/* Sidebar for small screens */}
        <div className="block md:hidden bg-gray-800 p-4 mb-4 rounded-md">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <FaUserLarge className="w-24 h-24 text-gray-500" />
              )}
            </div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-400">{user.email}</p>
            <p className="flex items-center mt-2">
              <CiCalendar className="mr-2" />
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="flex items-center mt-2 text-green-500">
              {user.status}
            </p>
            <button
              className="flex items-center mt-4 bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out"
              onClick={logOutHandler}
            >
              <CiLogout className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Public Rooms</h2>
          <button
            onClick={openModal}
            className="bg-sky-500 hover:bg-sky-600 text-gray-900 rounded-md px-4 py-2 transition duration-300 ease-in-out"
          >
            Create New Room
          </button>
        </div>
        <ul className="flex flex-col space-y-4">
          {rooms.map((room) => (
            <li key={room._id} className="bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span>{room.topic}</span>
                <Link to={`/chat/room/${room._id}`}>
                  <button className="bg-lime-500 hover:bg-lime-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out">
                    Join Chat Room
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {showModal && <Createroom onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default ChatRooms;
