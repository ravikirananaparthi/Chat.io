import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { Context, app, server } from "../main";
import { RiSendPlaneFill, RiAttachmentLine } from "react-icons/ri";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import validUrl from "valid-url";
import DOMPurify from "dompurify";
const ChatRoom = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imgurl, setImgUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const { user, RoomsData } = useContext(Context);
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [msg, setmsg] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  const targetRoomId = roomId;
  let topic;

  for (const room of RoomsData) {
    if (room["_id"] === targetRoomId) {
      topic = room["topic"];
      break;
    }
  }

  useEffect(() => {
    socketRef.current = io("https://chat-io-llor.onrender.com/");

    socketRef.current.emit("joinRoom", roomId);

    socketRef.current.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${server}/m/${roomId}/messages`, {
          withCredentials: true,
        });
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  
  const handleSendMessage = (e) => {
    e.preventDefault();
    let sanitizedMessage = newMessage;
  
    if (newMessage.trim()) {
      if (!validUrl.isUri(newMessage)) {
        sanitizedMessage = DOMPurify.sanitize(newMessage);
        console.log('hi')
      }
      console.log(sanitizedMessage);
      const message = {
        roomId,
        content: sanitizedMessage,
        sender: user._id,
      };
      socketRef.current.emit("sendMessage", message);
      setNewMessage("");
      setmsg("");
      setPreviewImage(null);
    }
  };

  const getPostFileName = (url) => {
    const segments = url.split("/");
    const lastSegment = segments[segments.length - 1];
    const fileName = decodeURIComponent(lastSegment.split("?")[0]);
    return fileName;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);

      const storage = getStorage(app);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            setNewMessage(downloadURL);
            setmsg(getPostFileName(downloadURL));
            setUploadProgress(0);
          });
        }
      );
    } else {
      console.log("No file selected.");
    }
  };

  const formatTime = (utcTime) => {
    const date = utcTime ? new Date(utcTime) : new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${adjustedHours}:${minutes} ${ampm}, ${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4">
      <div className="fixed top-0 left-0 right-0 md:left-1/3 bg-gray-800 p-4 z-10 flex items-center rounded-tl-3xl rounded-tr-3xl">
        <Link to={"/home"}>
          <IoIosArrowBack size={30} className="md:hidden" />
        </Link>
        <h2 className="text-xl font-semibold ml-7">{topic}</h2>
      </div>
      <div className="flex-grow pt-16 pb-20 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message.sender._id === user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-8 rounded-full">
                <img
                  alt="User avatar"
                  src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                />
              </div>
            </div>
            <div className="chat-header">{message.sender.name}</div>
            <div
              className={`mt-3 chat-bubble ${
                message.sender._id === user._id
                  ? "chat-bubble-accent"
                  : "chat-bubble-info"
              }`}
            >
              { validUrl.isUri(message.content) ? (
                <a
                  href={message.content}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={message.content}
                    alt="User uploaded content"
                    className="rounded-2xl sm:max-w-[300px] md:max-w-xs"
                  />
                </a>
              ) : (
                <span>{message.content}</span>
              )}
            </div>
            <div className="chat-footer opacity-50">
              {formatTime(message.timestamps)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="fixed bottom-0 left-0 right-0 md:left-1/3 bg-gray-800 p-4 flex items-center z-10"
      >
        <div className="relative">
          {previewImage && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-2xl transform scale-150 max-w-full max-h-full"
              />
            </div>
          )}
          {uploadProgress > 0 && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
              <p className="text-white mb-2">Uploading: {uploadProgress}%</p>
              <div className="w-3/4 bg-gray-200 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button type="button" className="text-gray-500 hover:text-white mr-2">
            <label>
              <input
                onChange={handleFileUpload}
                onKeyDown={handleFileUpload}
                type="file"
                className="hidden"
              />
              <RiAttachmentLine size={24} />
            </label>
          </button>
        </div>
        <input
          type="text"
          value={msg}
          onChange={(e) => {
            setmsg(e.target.value);
            setNewMessage(e.target.value);
          }}
          className="flex-grow p-2 bg-gray-700 text-white rounded-md focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md ml-2"
        >
          <RiSendPlaneFill size={24} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
