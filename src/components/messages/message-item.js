import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import * as mediaService from "../../services/media-service";
import * as messageService from "../../services/messages-service";
import { download } from "./ui-helper";

/**
 * Represents the message component of the chat section
 * @param messageItem message object
 * @param me logged in user
 * @param recipient recipient user object
 * @param refreshMessages function to refresh the messages
 * @returns {JSX.Element} react component
 * @constructor
 */
const MessageItem = ({ messageItem, me, recipient, refreshMessages }) => {

  const deleteMessage = () => {
    messageService.deleteMessage(messageItem._id).then(() => refreshMessages());
  };

  const [isPinned, setIsPinned] = useState(messageItem.pinned);
  const pinMessage = () => {
    const newMessage = { ...messageItem, pinned: !messageItem.pinned };
    messageService.pinMessage(newMessage).then(() => {
      setIsPinned(!isPinned);
      messageItem.pinned = isPinned;
    });
  };

  useEffect(() => {
    refreshMessages();
  }, [isPinned]);

  return (
    <li className="list-group-item border-0">
      {messageItem.recipient === me._id &&
        (messageItem.attachmentKey ? (
          <div className="w-100 d-flex align-items-center">
            <img
              className="avatar me-2 bg-secondary bg-opacity-50"
              src={`https://avatars.dicebear.com/api/adventurer/${recipient.username}.svg`}
              alt=""
            />
            <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25 d-flex align-items-center">
              <div
                className="px-2 round-icon bg-secondary bg-opacity-50"
                onClick={() => download(messageItem.attachmentKey)}
              >
                <i className="fa fa-download" />
              </div>
              <div className="ps-2">{messageItem.message}</div>
            </div>
            <label>
              <i
                className={`fa-solid fa-thumbtack ${
                  isPinned ? "pin-green" : "pin-gray"
                }`}
                onClick={pinMessage}
              ></i>
            </label>
          </div>
        ) : (
          <div className="w-100 d-flex align-items-center">
            <img
              className="avatar me-2 bg-secondary bg-opacity-50"
              src={`https://avatars.dicebear.com/api/adventurer/${recipient.username}.svg`}
              alt=""
            />
            <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25">
              {messageItem.message}
            </div>
            <label>
              <i
                className={`fa-solid fa-thumbtack ${
                  isPinned ? "pin-green" : "pin-gray"
                }`}
                onClick={pinMessage}
              ></i>
            </label>
          </div>
        ))}
      {messageItem.sender === me._id &&
        (messageItem.attachmentKey ? (
          <div className="w-100 d-flex justify-content-end align-items-center">
            <label>
              <i
                className={`fa-solid fa-thumbtack ${
                  isPinned ? "pin-green" : "pin-gray"
                }`}
                onClick={pinMessage}
              ></i>
            </label>
            <label className="btn rounded-circle" onClick={deleteMessage}>
              <i className="fa-solid fa-trash-can" />
            </label>
            <div className="p-2 text-break overflow-auto sender-message-color d-flex align-items-center">
              <div
                className="px-2 round-icon bg-secondary bg-opacity-50"
                onClick={() => download(messageItem.attachmentKey)}
              >
                <i className="fa fa-download" />
              </div>
              <div className="ps-2">{messageItem.message}</div>
            </div>
            <img
              className="avatar ms-2 bg-secondary bg-opacity-50"
              src={`https://avatars.dicebear.com/api/adventurer/${me.username}.svg`}
              alt=""
            />
          </div>
        ) : (
          <div className="w-100 d-flex justify-content-end align-items-center">
            <label>
              <i
                className={`fa-solid fa-thumbtack ${
                  isPinned ? "pin-green" : "pin-gray"
                }`}
                onClick={pinMessage}
              ></i>
            </label>
            <label className="btn rounded-circle" onClick={deleteMessage}>
              <i className="fa-solid fa-trash-can" />
            </label>
            <div className="p-2 text-break overflow-auto sender-message-color">
              {messageItem.message}
            </div>
            <img
              className="avatar ms-2 bg-secondary bg-opacity-50"
              src={`https://avatars.dicebear.com/api/adventurer/${me.username}.svg`}
              alt=""
            />
          </div>
        ))}
    </li>
  );
};

export default MessageItem;
