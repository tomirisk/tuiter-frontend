import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MessageItem from "./message-item";
import * as messageService from "../../services/messages-service";
import * as service from "../../services/auth-service";

/**
 * Represents the chat component of the messages section
 * @returns {JSX.Element} react component
 * @constructor
 */
const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sender, setSender] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  /**
   * Sends message using message service
   */
  const send = () => {
    messageService.sendMessage("me", recipient._id, message, attachment);
  }

  // TODO : Subscribe for Firebase event. When event received, call refreshMessages()
  /**
   * Refreshes the list of messages
   */
  const refreshMessages = () => {
    if (!(location.state && location.state.chat)) {
      navigate('/messages');
      return;
    }

    service.profile().then(sender => {
      const recipient = location.state.chat;
      setSender(sender);
      setRecipient(recipient);
      messageService.getMessages("me", recipient._id).then(messages => {
        messages.sort((message1, message2) => new Date(message1.sentOn).getTime() - new Date(message2.sentOn).getTime());
        setMessages(messages);
      });
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/messages',
        }
      });
    });
  }

  useEffect(() => {
    refreshMessages();
  }, []);

  return(
    <>
      {
        recipient &&
        <div className="d-flex flex-column h-100">
          <div className="bg-secondary bg-opacity-50 p-2 d-flex align-items-center">
            <Link to="/messages"><i className="fa fa-angle-left ps-2 pe-4 text-black" /></Link>
            <h3>@{recipient.username} - {recipient.firstName} {recipient.lastName}</h3>
          </div>
          <div className="h-100 overflow-auto">
            {
              messages.map(message => <MessageItem key={message._id} messageItem={message} me={sender} />)
            }
          </div>
          <div className="d-flex">
            <textarea className="m-2 w-100 form-control bg-secondary bg-opacity-25"
                      onChange={(event) => setMessage(event.target.value)}>
            </textarea>
            <div className="d-flex flex-column justify-content-around">
              <label className="me-2 mt-2 btn rounded-circle bg-secondary bg-opacity-25"
                     onClick={send}><i className="fa fa-paper-plane"/></label>
              {
                attachment ?
                <label onClick={() => setAttachment(null)} className="me-2 my-2 btn rounded-circle bg-primary text-white">
                  <i className="fa fa-remove"/>
                </label>
                :
                <div>
                  <label htmlFor="attachment" className="me-2 my-2 btn rounded-circle bg-secondary bg-opacity-25">
                    <i className="fa fa-paperclip"/>
                  </label>
                  <input id="attachment" type="file" className="d-none"
                         onChange={(event) => setAttachment(event.target.files[0])}/>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Chat;