import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./index.css";
import MessageInput from "./message-input";
import MessageList from "./message-list";
import PinnedMessages from "./pinned-messages";
import * as messageService from "../../services/messages-service";
import { scrollToBottom, refreshMessagesUI } from "./ui-helper";

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
  const [showPins, setShowPins] = useState(false);

  /**
   * Sends message using message service
   */
  const send = (message, attachment) => {
    if (attachment && attachment.size / (1024 * 1024) > 5) {
      alert("Please select a file of size less than 5 MB");
      return;
    }

    messageService.sendMessage("me", recipient._id, message.trim(), attachment)
      .then(() => refreshMessages())
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  /**
   * Refreshes the list of messages
   */
  const refreshMessages = () => {
    refreshMessagesUI(location, navigate, socket, (sender, recipient) => {
      setSender(sender);
      setRecipient(recipient);
      messageService.getMessages("me", recipient._id).then((messages) => {
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

  const messageDetails = {
    messages: messages,
    sender: sender,
    recipient: recipient,
  };

  const togglePinVisibility = () => {
    setShowPins(!showPins);
  };

  return (
    <>
      {recipient && (
        <div className="d-flex flex-column h-100">
          <div className="bg-secondary bg-opacity-50 p-2 d-flex align-items-center">
            <Link to="/messages">
              <i className="fa fa-angle-left ps-2 pe-4 text-black" />
            </Link>

            {!showPins && (
              <h3>
                @{recipient.username} - {recipient.firstName}{" "}
                {recipient.lastName}
              </h3>
            )}
            {showPins && (
              <h3>
                Pins @{recipient.username} - @{sender.username}
              </h3>
            )}

            {!showPins && (
              <i
                className="fa-solid fa-2x fa-thumbtack pin-icon"
                onClick={togglePinVisibility}
              ></i>
            )}

            {showPins && (
              <i
                className="fa fa-2x fa-times-circle pin-icon"
                aria-hidden="true"
                onClick={togglePinVisibility}
              ></i>
            )}
          </div>
          {showPins && (
            <PinnedMessages
              details={messageDetails}
              refreshMessages={refreshMessages}
            />
          )}
          {!showPins && (
            <MessageList
              details={messageDetails}
              refreshMessages={refreshMessages}
            />
          )}
          {!showPins && <MessageInput sendHandler={send} />}
        </div>
      )}
    </>
  );
};

export default Chat;
