import React from "react";
import MessageItem from "./message-item";

/**
 * Represents the message list component of the chat section
 * @param details Details of the message including the message content, sender and recipient
 * @param refreshMessages function to refresh the messages
 * @returns {JSX.Element} react component
 * @constructor
 */
const MessageList = ({ details, refreshMessages }) => {
  return (
    <div id="messages-scroll-view" className="h-100 overflow-auto">
      {details.messages.map((message) => (
        <MessageItem
          key={message._id}
          messageItem={message}
          me={details.sender}
          recipient={details.recipient}
          refreshMessages={refreshMessages}
        />
      ))}
    </div>
  );
};

export default MessageList;
