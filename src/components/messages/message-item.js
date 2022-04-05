import React from "react";
import * as mediaService from '../../services/media-service';

/**
 * Represents the message component of the chat section
 * @param messageItem message object
 * @returns {JSX.Element} react component
 * @constructor
 */
const MessageItem = ({messageItem, me}) => {
  /**
   * Downloads the attachment in the message item
   */
  const download = () => {
    //mediaService.get(messageItem.attachmentKey);
    // TODO : replace with the above call after configuring S3
    fetch(messageItem.attachment)
      .then(resp => resp.blob())
      .then(blob => {
        // TODO : think of a better way to do this
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  return(
    <li className="list-group-item border-0">
      {
        messageItem.recipient === me._id && (
          messageItem.attachment ?
            <div className="w-100 d-flex">
              <img className="avatar me-2" src="/images/alice.jpg" alt=""/>
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25 d-flex align-items-center">
                <div className="px-2 round-icon bg-secondary bg-opacity-50" onClick={download}><i className="fa fa-download"/></div>
                <div className="ps-2">{messageItem.message}</div>
              </div>
            </div>
           :
            <div className="w-100 d-flex">
              <img className="avatar me-2" src="/images/alice.jpg" alt=""/>
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25">
                {messageItem.message}
              </div>
            </div>
        )
      }
      {
        messageItem.sender === me._id && (
          messageItem.attachment ?
            <div className="w-100 d-flex justify-content-end">
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25 d-flex align-items-center">
                <div className="px-2 round-icon bg-secondary bg-opacity-50" onClick={download}><i className="fa fa-download"/></div>
                <div className="ps-2">{messageItem.message}</div>
              </div>
              <img className="avatar ms-2" src="/images/bob.jpg" alt=""/>
            </div>
            :
            <div className="w-100 d-flex justify-content-end">
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25">
                {messageItem.message}
              </div>
              <img className="avatar ms-2" src="/images/bob.jpg"/>
            </div>
        )
      }
    </li>
  );
}

export default MessageItem;