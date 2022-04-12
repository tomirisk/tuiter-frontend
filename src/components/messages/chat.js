import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MessageItem from "./message-item";
import * as messageService from "../../services/messages-service";
import * as service from "../../services/auth-service";
import MessageInput from "./message-input";
import "./index.css";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_URL);

/**
 * Represents the chat component of the messages section
 * @returns {JSX.Element} react component
 * @constructor
 */
const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sender, setSender] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);

  /**
   * Sends message using message service
   */
  const send = (message, attachment) => {
    if (attachment && attachment.size / (1024 * 1024) > 5) {
      alert("Please select a file of size less than 5 MB");
      return;
    }

    messageService.sendMessage("me", recipient._id, message.trim(), attachment)
      .then(() => refreshMessages()).catch(err => {
      console.log(err);
      alert("Something went wrong");
    });
  }

  /**
   * Refreshes the list of messages
   */
  const refreshMessages = () => {
    if (!(location.state && location.state.chat)) {
      navigate('/messages');
      return;
    }

    service.profile().then(sender => {
      const recipient = location.state.chat;
      setSender(sender);
      setRecipient(recipient);
      messageService.getMessages("me", recipient._id).then(messages => {
        messages.sort((message1, message2) => new Date(message1.sentOn).getTime() - new Date(message2.sentOn).getTime());
        setMessages(messages);
      });

      subscribeForUpdates(sender);
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/messages',
        }
      });
    });
  }

  /**
   * Subscribe on socket.io for updates
   */
  const subscribeForUpdates = (sender) => {
    try {
      socket.removeAllListeners(sender._id);
      socket.on(sender._id, (args) => refreshMessages());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    refreshMessages();
  }, []);

  useEffect(() => {
    const element = document.getElementById("messages-scroll-view");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return(
    <>
      {
        recipient &&
        <div className="d-flex flex-column h-100">
          <div className="bg-secondary bg-opacity-50 p-2 d-flex align-items-center">
            <Link to="/messages"><i className="fa fa-angle-left ps-2 pe-4 text-black" /></Link>
            <h3>@{recipient.username} - {recipient.firstName} {recipient.lastName}</h3>
          </div>
          <div id="messages-scroll-view" className="h-100 overflow-auto">
            {
              messages.map(message => <MessageItem key={message._id} messageItem={message} me={sender} recipient={recipient} />)
            }
          </div>
          <MessageInput sendHandler={send} />
        </div>
      }
    </>
  );
}

export default Chat;