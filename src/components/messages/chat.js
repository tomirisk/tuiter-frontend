import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import MessageItem from "./message-item";
import * as messageService from "../../services/messages-service";

/**
 * Represents the chat component of the messages section
 * @returns {JSX.Element} react component
 * @constructor
 */
const Chat = () => {
  const location = useLocation();
  const receiver = location.state.chat;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // TODO: use redux to store profile
  const me = "me";
  /**
   * Sends message using message service
   */
  const send = () => {
    messageService.sendMessage(me, receiver._id, message);
  }

  /**
   * Sends file using message service
   * @param file file blob
   */
  const sendFile = (file) => {
    messageService.sendAttachment(me, receiver._id, file);
  }

  /**
   * Refreshes the list of messages
   */
  const refreshMessages = () => {
    const messages = messageService.getMessages(me, receiver._id);
    messages.sort((message1, message2) => message1.sentOn - message2.sentOn);
    setMessages(messages);
  }

  useEffect(() => {
    refreshMessages();
  }, []);

  return(
    <div className="d-flex flex-column h-100">
      <div className="bg-secondary bg-opacity-50 p-2 d-flex align-items-center">
        <Link to="/messages"><i className="fa fa-angle-left ps-2 pe-4 text-black" /></Link>
        <h3>{receiver.firstName} {receiver.lastName}</h3>
      </div>
      <div className="h-100 overflow-auto">
        {
          messages.map(message => <MessageItem key={message._id} messageItem={message} />)
        }
      </div>
      <div className="d-flex">
        <textarea className="m-2 w-100 form-control bg-secondary bg-opacity-25"
                  onChange={(event) => setMessage(event.target.value)}>
        </textarea>
        <div className="d-flex flex-column justify-content-around">
          <label className="me-2 mt-2 btn rounded-circle bg-secondary bg-opacity-25"
                 onClick={send}><i className="fa fa-paper-plane"/></label>
          <label htmlFor="attachment" className="me-2 my-2 btn rounded-circle bg-secondary bg-opacity-25">
            <i className="fa fa-paperclip"/>
          </label>
            <input id="attachment" type="file" className="d-none"
                   onChange={(event) => sendFile(event.target.files[0])}/>
        </div>
      </div>
    </div>
  );
}

export default Chat;