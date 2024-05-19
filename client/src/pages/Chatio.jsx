import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import ChatRoomsSidebar from '../components/ChatRoomsSidebar';
import ChatRoom from '../components/ChatRoom';

const Chatio = () => {
  const navigate = useNavigate();
  const { RoomsData } = useContext(Context);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="hidden md:flex md:flex-col w-full md:w-1/3 bg-gray-900 text-white h-screen border-r-4 border-black">
        <ChatRoomsSidebar RoomsData={RoomsData} onSelectRoom={(roomId, roomname) => navigate(`/chat/room/${roomId}`)} />
      </div>
      <div className="w-full md:w-2/3 h-screen overflow-auto">
        <Routes>
          <Route path="room/:roomId" element={<ChatRoom />} />
        </Routes>
      </div>
    </div>
  );
};

export default Chatio;

