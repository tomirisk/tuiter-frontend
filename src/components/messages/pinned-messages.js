import React from "react";
import MessageList from "./message-list";

/**
 * Represents the pinned messages component of the chat section
 * @param details Details of the message including the message content, sender and recipient
 * @param refreshMessages function to refresh the messages
 * @returns {JSX.Element} react component
 * @constructor
 */
const PinnedMessages = ({ details, refreshMessages }) => {
  const pinnedMessages = details.messages.filter(
    (message) => message.pinned === true
  );
  const pinDetails = {
    messages: pinnedMessages,
    sender: details.sender,
    recipient: details.recipient,
  };
  return <MessageList details={pinDetails} refreshMessages={refreshMessages} />;
};

export default PinnedMessages;
