import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

import { MESSAGE_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";

const Messages = () => {
  const { receiverId } = useParams();
  const { currentUser } = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [inp, setInp] = useState("");
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  // useEffect(() => {
  //   if (!currentUser?._id || !receiverId) return;

  //   const newSocket = io("http://localhost:8000");
  //   setSocket(newSocket);

  //   newSocket.emit("joinRoom", {
  //     senderId: currentUser._id,
  //     receiverId,
  //   });

  //   newSocket.on("privateMessage", (msg) => {
  //     setMessages((prev) => [...prev, msg]);
  //   });

  //   return () => newSocket.disconnect();
  // }, [currentUser, receiverId]);

  // useEffect(() => {
  //   const fetchConversation = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${MESSAGE_API_END_POINT}/conversations/${currentUser._id}`
  //       );
  //       const conv = res.data.find((c) =>
  //         c.participants.some((p) => p._id === receiverId)
  //       );
  //       if (conv) {
  //         setConversationId(conv._id);
  //         const msgRes = await axios.get(
  //           `${MESSAGE_API_END_POINT}/messages/${conv._id}`
  //         );
  //         setMessages(msgRes.data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching messages:", err);
  //     }
  //   };

  //   if (currentUser && receiverId) fetchConversation();
  // }, [currentUser, receiverId]);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (socket && inp.trim()) {
  //     socket.emit("privateMessage", {
  //       senderId: currentUser._id,
  //       receiverId,
  //       message: inp,
  //     });
  //     setInp("");
  //   }
  // };

  useEffect(() => {
    toast.info("Feature Coming soon");
  });

  return (
    <div>
      <Navbar />
      {/* <div className="p-10">
        <div className="mb-4 max-h-[400px] overflow-y-auto border p-3">
          {messages.map((msg, idx) => (
            <p
              key={idx}
              className={`p-2 my-1 rounded w-fit ${
                msg.senderId === currentUser._id
                  ? "bg-blue-200 ml-auto text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              {msg.message}
            </p>
          ))}
        </div>

        <div className="flex">
          <input
            className="border px-2 py-1 flex-grow"
            type="text"
            onChange={(e) => setInp(e.target.value)}
            value={inp}
          />
          <button
            onClick={handleClick}
            className="ml-2 px-4 py-1 bg-blue-500 text-white"
          >
            Send
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Messages;
