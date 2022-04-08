import React, {useEffect, useState} from "react";
import * as userService from "../../services/users-service";
import {Link, useNavigate} from "react-router-dom";
import "./index.css";
import * as service from "../../services/auth-service";

/**
 * Represents the messages component of Tuiter
 * @returns {JSX.Element} react component
 * @constructor
 */
const Messages = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  /**
   * Set the list of chats to display based on search criteria
   * @param searchValue string to search in chat name
   */
  const setChatList = (searchValue) => {
    const chatsToDisplay = users.filter(user =>
      (user.firstName && user.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (user.username && user.username.toLowerCase().includes(searchValue.toLowerCase())))
    setChats(chatsToDisplay);
  }

  useEffect(() => {
    const fetchChats = () => {
      service.profile().then(me => {
        userService.findAllUsers().then(userList => {
          setUsers(userList.filter(user => user._id !== me._id));
          setChats(userList.filter(user => user._id !== me._id));
        });
      }).catch(e => {
        navigate('/login', {
          state: {
            redirect: '/messages',
          }
        });
      })
    }

    fetchChats();
  }, []);

  return(
    <>
      <ul className="list-group">
        <li className="list-group-item">
          <input className="form-control rounded-pill bg-secondary bg-opacity-25"
                 placeholder="Search recipient"
                 onChange={(event) => setChatList(event.target.value)} />
        </li>
        {
          chats.map && chats.map(chat => {
            return (
              <Link to="chat" key={chat.username} state={{chat}} className="list-group-item bg-secondary bg-opacity-25">
                <div className="w-100 d-flex align-items-center">
                  <img className="avatar me-2 bg-secondary bg-opacity-50" src={`https://avatars.dicebear.com/api/adventurer/${chat.username}.svg`} alt=""/>
                  <div className="p-2 text-break overflow-auto">
                    <span>@{chat.username} - {chat.firstName} {chat.lastName}</span>
                  </div>
                </div>
              </Link>
            );
          })
        }
      </ul>
    </>
  );
};

export default Messages;