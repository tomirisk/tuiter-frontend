import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./index.css";
import MessageInput from "./message-input";
import GroupMessageItem from "./group-message-item";
import * as messageService from "../../services/messages-service";
import { scrollToBottom, refreshMessagesUI } from "./ui-helper";

const socket = io(process.env.REACT_APP_BASE_URL);

/**
 * Represents the group chat component of the messages section
 * @returns {JSX.Element} react component
 * @constructor
 */
const GroupChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sender, setSender] = useState(null);
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  /**
   * Sends group message using message service
   */
  const send = (message, attachment) => {
    if (attachment && attachment.size / (1024 * 1024) > 5) {
      alert("Please select a file of size less than 5 MB");
      return;
    }

    messageService.sendGroupMessage("me", group._id, message.trim(), attachment)
      .then(() => refreshMessages()).catch(err => {
      console.log(err);
      alert("Something went wrong");
    });
  }

  /**
   * Refreshes the list of messages
   */
  const refreshMessages = () => {
    refreshMessagesUI(location, navigate, socket, (sender, group) => {
      setSender(sender);
      setGroup(group);
      messageService.getGroupMessages(group, sender).then(messages => {
        messages.sort((message1, message2) => new Date(message1.sentOn).getTime() - new Date(message2.sentOn).getTime());
        setMessages(messages);
      });
    });
  }

  useEffect(() => {
    refreshMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return(
    <>
      {
        group &&
        <div className="d-flex flex-column h-100">
          <div className="bg-secondary bg-opacity-50 p-2 d-flex align-items-center">
            <Link to="/messages"><i className="fa fa-angle-left ps-2 pe-4 text-black" /></Link>
            <h3>{group.name}</h3>
          </div>
          <div id="messages-scroll-view" className="h-100 overflow-auto">
            {
              messages.map(message => <GroupMessageItem key={message._id} messageItem={message} me={sender} />)
            }
          </div>
          <MessageInput sendHandler={send} />
        </div>
      }
    </>
  );
}

export default GroupChat;