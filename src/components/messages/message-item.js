import React from "react";

/**
 * Represents the message component of the chat section
 * @param messageItem message object
 * @returns {JSX.Element} react component
 * @constructor
 */
const MessageItem = ({messageItem}) => {
  // TODO: use redux to store profile
  const me = "me";

  /**
   * Downloads the attachment in the message item
   */
  const download = () => {
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
    <>
      {
        messageItem.sender === me && (
          messageItem.attachment ?
            <div className="p-2 w-100 d-flex">
              <img className="avatar me-2" src="/images/alice.jpg"/>
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25 d-flex align-items-center">
                <div className="px-2 round-button bg-secondary bg-opacity-50" onClick={download}><i className="fa fa-download"/></div>
                <div className="ps-2">{messageItem.message}</div>
              </div>
            </div>
           :
            <div className="p-2 w-100 d-flex">
              <img className="avatar me-2" src="/images/alice.jpg" alt=""/>
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25">
                {messageItem.message}
              </div>
            </div>
        )
      }
      {
        messageItem.receiver === me && (
          messageItem.attachment ?
            <div className="p-2 w-100 d-flex justify-content-end">
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25 d-flex align-items-center">
                <div className="px-2 round-button bg-secondary bg-opacity-50" onClick={download}><i className="fa fa-download"/></div>
                <div className="ps-2">{messageItem.message}</div>
              </div>
              <img className="avatar ms-2" src="/images/bob.jpg" alt=""/>
            </div>
            :
            <div className="p-2 w-100 d-flex justify-content-end">
              <div className="p-2 text-break overflow-auto bg-secondary bg-opacity-25">
                {messageItem.message}
              </div>
              <img className="avatar ms-2" src="/images/bob.jpg"/>
            </div>
        )
      }
    </>
  );
}

export default MessageItem;