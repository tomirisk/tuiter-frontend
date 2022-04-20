import React, {useEffect, useState} from "react";
import MessageInput from "./message-input";
import * as service from "../../services/auth-service";
import * as userService from "../../services/users-service";
import {useNavigate} from "react-router-dom";
import "./index.css";
import MultiSelectUsers from "../multi-select-users";
import * as messageService from "../../services/messages-service";
import * as groupsService from "../../services/groups-service";

/**
 * Component to represent Broadcast Messages screen
 * @returns {JSX.Element} React component
 * @constructor
 */
const Broadcast = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    service.profile().then(async (me) => {
      const userList = await userService.findAllUsers();
      setUsers(userList.filter(user => user._id !== me._id));
      const groupList = await groupsService.findGroups(me._id);
      setGroups(groupList);
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/messages',
        }
      });
    })
  }, []);

  /**
   * Sends the broadcast message
   * @param message the message
   * @param attachment the attachment if present
   */
  const send = (message, attachment) => {
    if (attachment && attachment.size / (1024 * 1024) > 5) {
      alert("Please select a file of size less than 5 MB");
      return;
    }

    messageService.sendBroadcastMessage("me", selectedUsers.map(selectedUser => selectedUser._id), message.trim(), attachment)
      .catch(err => {alert("Something went wrong");});
  }

  /**
   * Handler for user selection change
   * @param users array of selected users
   */
  const handleChange = (users) => {
    setSelectedUsers(users);
  }

  return(
    <>
      <h2>Broadcast</h2>
      <MessageInput sendHandler={send} />
      {
        users && <MultiSelectUsers users={users} groups={groups} onChange={handleChange} />
      }
    </>
  );
}

export default Broadcast;