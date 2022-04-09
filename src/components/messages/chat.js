import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MessageItem from "./message-item";
import * as messageService from "../../services/messages-service";
import * as service from "../../services/auth-service";
import MessageInput from "./message-input";
import "./index.css";

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

    messageService.sendMessage("me", recipient._id, message.trim(), attachment).catch(err => {
      alert("Something went wrong");
    });
  }

  // TODO : Subscribe for Firebase event. When event received, call refreshMessages()
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

        const element = document.getElementById("messages-scroll-view");
        element.scrollTop = element.scrollHeight;
      });
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/messages',
        }
      });
    });
  }

  useEffect(() => {
    refreshMessages();
  }, []);

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