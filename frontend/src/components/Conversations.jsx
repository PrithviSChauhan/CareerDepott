import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MESSAGE_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";

const Conversations = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${MESSAGE_API_END_POINT}/conversations/${currentUser._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };

    if (currentUser) fetchConversations();
  }, [currentUser]);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
        {conversations.map((conv) => {
          const other = conv.participants.find(
            (p) => p._id !== currentUser._id
          );
          return (
            <div
              key={conv._id}
              onClick={() => navigate(`/messages/${other._id}`)}
              className="cursor-pointer p-3 border-b hover:bg-gray-100"
            >
              <p>{other.name || other.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Conversations;
