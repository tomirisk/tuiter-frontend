import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./index.css";
import * as userService from "../../services/users-service";
import * as authService from "../../services/auth-service";
import * as groupsService from "../../services/groups-service";

/**
 * Represents the messages component of Tuiter
 * @returns {JSX.Element} react component
 * @constructor
 */
const Messages = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [groups, setGroups] = useState([]);

  /**
   * Set the list of chats to display based on search criteria
   * @param searchValue string to search in chat name
   * @param userList list of users to search from
   * @param groupList list of groups to search from
   */
  const setChatList = (searchValue, userList, groupList) => {
    const usersToSearchFrom = userList || users;
    const userChatsToDisplay = usersToSearchFrom.filter(user =>
      (user.firstName && user.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchValue.toLowerCase())));

    const groupsToSearchFrom = groupList || groups;
    const groupChatsToDisplay = groupsToSearchFrom.filter(group =>
      (group.name && group.name.toLowerCase().includes(searchValue.toLowerCase())));

    const chatsToDisplay = [...userChatsToDisplay, ...groupChatsToDisplay];
    chatsToDisplay.sort((chat1, chat2) =>
      !chat1.latestMessage ? 1 : !chat2.latestMessage ? -1 : (chat1.latestMessage && chat2.latestMessage) ?
        new Date(chat2.latestMessage.sentOn).getTime() - new Date(chat1.latestMessage.sentOn).getTime() : 0);

    setChats(chatsToDisplay);
  }

  useEffect(() => {
    const fetchChats = () => {
      authService.profile().then(async (me) => {
        const usersResponse = await userService.findAllUsers("me", "latest-message");
        const userList = usersResponse.users.filter(user => user._id !== me._id);
        usersResponse.metadata.map((data) => {
          const user = userList.find(user => user._id === data._id);
          if (user && data.latestMessage) {
            user.latestMessage = data.latestMessage;
          }
        });
        setUsers(userList);

        const groupResponse = await groupsService.findGroups("me", "latest-message");
        const groupList = groupResponse.groups;
        groupResponse.metadata.map((data) => {
          const group = groupList.find(group => group._id === data._id);
          if (group && data.latestMessage) {
            group.latestMessage = data.latestMessage;
          }
        });
        setGroups(groupList);

        setChatList('', userList, groupList);
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
        <li className="list-group-item d-flex align-items-center">
          <input className="form-control rounded-pill bg-secondary bg-opacity-25"
                 placeholder="Search recipient"
                 onChange={(event) => setChatList(event.target.value)} />
          <Link to="create-group"><i className="fas fa-user-group ms-3" /></Link>
          <Link to="broadcast"><i className="fa-solid fa-bullhorn ms-3" /></Link>
        </li>
        {
          chats.map && chats.map(chat => {
            return (
              chat.username ?
              <Link to="chat" key={chat.username} state={{chat}} className="list-group-item bg-secondary bg-opacity-25">
                <div className="w-100 d-flex align-items-center">
                  <img className="avatar me-2 bg-secondary bg-opacity-50" src={`https://avatars.dicebear.com/api/adventurer/${chat.username}.svg`} alt=""/>
                  <div className="p-2 text-break overflow-auto">
                    <div>@{chat.username} - {chat.firstName} {chat.lastName}</div>
                    <div className="small text-secondary">{chat.latestMessage && chat.latestMessage.message}</div>
                  </div>
                </div>
              </Link>
              :
              <Link to="group-chat" key={chat.name} state={{chat}} className="list-group-item bg-secondary bg-opacity-25">
                <div className="w-100 d-flex align-items-center">
                  <img className="avatar me-2 bg-secondary bg-opacity-50" src={`https://avatars.dicebear.com/api/initials/${chat.name}.svg`} alt=""/>
                  <div className="p-2 text-break overflow-auto">
                    <div>{chat.name}</div>
                    <div className="small text-secondary">{chat.latestMessage && chat.latestMessage.message}</div>
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