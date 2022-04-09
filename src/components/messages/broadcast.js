import React, {useEffect, useState} from "react";
import MessageInput from "./message-input";
import * as service from "../../services/auth-service";
import * as userService from "../../services/users-service";
import {useNavigate} from "react-router-dom";
import "./index.css";
import MultiSelectUsers from "./multi-select-users";
import * as messageService from "../../services/messages-service";

const Broadcast = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const selectedUserIds = [];

  useEffect(() => {
    service.profile().then(me => {
      userService.findAllUsers().then(userList => {
        setUsers(userList.filter(user => user._id !== me._id));
      });
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/messages',
        }
      });
    })
  }, []);

  const send = (message, attachment) => {
    if (attachment && attachment.size / (1024 * 1024) > 5) {
      alert("Please select a file of size less than 5 MB");
      return;
    }

    // TODO : To be implemented
    // messageService.sendBroadcastMessage("me", selectedUserIds, message.trim(), attachment).catch(err => {
    //   alert("Something went wrong");
    // });
  }

  const selectUser = (id) => {
    selectedUserIds.push(id);
  }

  const deselectUser = (id) => {
    const index = selectedUserIds.indexOf(id);
    if (index >= 0) {
      selectedUserIds.splice(index, 1);
    }
  }

  return(
    <>
      <h2>Broadcast</h2>
      <MessageInput sendHandler={send} />
      {
        users && <MultiSelectUsers users={users} checkHandler={selectUser} uncheckHandler={deselectUser} />
      }
    </>
  );
}

export default Broadcast;