import React, {useEffect, useState} from "react";
import ChatList from "./chat-list";
import * as userService from "../../services/users-service";

/**
 * Represents the messages component of Tuiter
 * @returns {JSX.Element} react component
 * @constructor
 */
const Messages = () => {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  /**
   * Set the list of chats to display based on search criteria
   * @param searchValue string to search in chat name
   */
  const setChatList = (searchValue) => {
    const chatsToDisplay = users.filter(user =>
      (user.firstName && user.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchValue.toLowerCase())))
    setChats(chatsToDisplay);
  }

  useEffect(() => {
    userService.findAllUsers().then(userList => {
      setUsers(userList);
      setChats(userList);
    });
  }, []);

  return(
    <>
      <input className="form-control" onChange={(event) => setChatList(event.target.value)} />
      <ChatList chatList={chats} />
    </>
  );
};

export default Messages;