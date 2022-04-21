import React, { useState } from "react";
import "./index.css";

/**
 * A reusable component with a text field to enter message and an option to attach a file
 * @param sendHandler handler to execute when send button is clicked
 * @returns {JSX.Element} React component
 * @constructor
 */
const MessageInput = ({ sendHandler }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  /**
   * Calls the sendHandler
   */
  const send = () => {
    sendHandler(message.trim(), attachment);
  };

  return (
    <>
      <div className="d-flex">
        <textarea
          className="m-2 w-100 form-control bg-secondary bg-opacity-25 resize-none"
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
        <div className="d-flex flex-column justify-content-around">
          <label
            className={`me-2 mt-2 btn rounded-circle bg-secondary bg-opacity-25 ${
              message.trim() ? "" : "disabled"
            }`}
            onClick={send}
          >
            <i className="fa fa-paper-plane" />
          </label>
          {attachment ? (
            <label
              onClick={() => setAttachment(null)}
              className="me-2 my-2 btn rounded-circle bg-primary text-white"
            >
              <i className="fa fa-remove" />
            </label>
          ) : (
            <div>
              <label
                htmlFor="attachment"
                className="me-2 my-2 btn rounded-circle bg-secondary bg-opacity-25"
              >
                <i className="fa fa-paperclip" />
              </label>
              <input
                id="attachment"
                type="file"
                className="d-none"
                onChange={(event) => setAttachment(event.target.files[0])}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageInput;
