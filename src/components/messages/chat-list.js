import React from 'react';
import './index.css';
import {Link} from "react-router-dom";

/**
 * Represents the chat list component of the messages section
 * @param chatList list of chats to display
 * @returns {JSX.Element} react component
 * @constructor
 */
const ChatList = ({chatList = []}) => {
  return (
    <div>
      <ul className="list-group">
        {
          chatList.map && chatList.map(chat => {
            return (
              <Link to="/chat" key={chat.username} state={{chat}} className="list-group-item">
                <span>{chat.firstName} {chat.lastName}</span>
              </Link>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ChatList;