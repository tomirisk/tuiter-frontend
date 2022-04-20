import React from "react";
import "./index.css";
import * as messageService from "../../services/messages-service";
import { download } from "./ui-helper";

/**
 * Represents the message component of the chat section
 * @param messageItem message object
 * @param me logged in user
 * @param refreshMessages function to refresh the messages
 * @returns {JSX.Element} react component
 * @constructor
 */
const GroupMessageItem = ({messageItem, me, refreshMessages}) => {
  const deleteMessage = () => {
    messageService.deleteGroupMessage(messageItem.group._id, messageItem._id).then(() => refreshMessages());
  }

  return(
    <li className="list-group-item border-0">
      {
        messageItem.sender._id === me._id ?
        (
          <div className="w-100 d-flex justify-content-end align-items-center">
            <label className="btn rounded-circle"
                   onClick={deleteMessage}><i className="fa-solid fa-trash-can"/></label>
            <div className="p-2 text-break overflow-auto sender-message-color">
              {
                messageItem.attachmentKey ?
                <div className="d-flex align-items-center">
                  <div className="px-2 round-icon bg-secondary bg-opacity-50" onClick={download}><i className="fa fa-download"/></div>
                  <div className="ps-2">{messageItem.message}</div>
                </div>
                :
                <span>{messageItem.message}</span>
              }
            </div>
            <img className="avatar ms-2 bg-secondary bg-opacity-50" src={`https://avatars.dicebear.com/api/adventurer/${me.username}.svg`} alt=""/>
          </div>
        )
        :
        (
          <div className="w-100 d-flex align-items-center">
            <img className="avatar me-2 bg-secondary bg-opacity-50" src={`https://avatars.dicebear.com/api/adventurer/${messageItem.sender.username}.svg`} alt=""/>
            <div>
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25">
                <div className="fw-bold">@{messageItem.sender.username} - {messageItem.sender.firstName} {messageItem.sender.lastName}</div>
                {
                  messageItem.attachmentKey ?
                  <div className="d-flex align-items-center">
                    <div className="px-2 round-icon bg-secondary bg-opacity-50" onClick={() => download(messageItem.attachmentKey)}><i className="fa fa-download"/></div>
                    <div className="ps-2">{messageItem.message}</div>
                  </div>
                  :
                  <span>{messageItem.message}</span>
                }
              </div>
            </div>
          </div>
        )
      }
    </li>
  );
}

export default GroupMessageItem;