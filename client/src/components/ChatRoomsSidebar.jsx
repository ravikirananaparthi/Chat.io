import React from 'react';

const ChatRoomsSidebar = ({ RoomsData, onSelectRoom }) => {
  return (
    <div className="p-4  bg-gray-800 h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Public Channels</h2>
      <ul className="space-y-4 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {RoomsData.map((room) => (
          <li
            key={room._id}
            className="bg-gray-900 hover:bg-gray-700 px-6 py-3 rounded-md cursor-pointer transition-all duration-300 flex items-center"
            onClick={() => onSelectRoom(room._id, room.topic)}
          >
            <span className="text-white font-medium">{room.topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomsSidebar;

