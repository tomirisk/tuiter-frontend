import axios from "axios";
import * as mediaService from "../../services/media-service";
import * as authService from "../../services/auth-service";

/**
 * Downloads the attachment in the message item
 * @param attachmentKey media unique identifier key
 */
export const download = (attachmentKey) => {
  mediaService.getURL(attachmentKey).then(url => {
    axios.get(url, {responseType: 'blob'}).then(response => {
      if (response.data) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    })
  })
}

/**
 * Scrolls to bottom of the component
 */
export const scrollToBottom = () => {
  const element = document.getElementById("messages-scroll-view");
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

/**
 * Subscribe on socket.io for updates
 * @param socket socket io instance
 * @param event event to register
 * @param handler handler to execute when event occurs
 */
const subscribeForUpdates = (socket, event, handler) => {
  try {
    socket.removeAllListeners(event);
    socket.on(event, handler);
  } catch (e) {
    console.log(e);
  }
}

/**
 *  Refreshes the list of messages
 * @param location react location object
 * @param navigate react navigate object
 * @param socket socket io instance
 * @param callback callback to execute after authentication
 */
export const refreshMessagesUI = (location, navigate, socket, callback) => {
  if (!(location.state && location.state.chat)) {
    navigate('/messages');
    return;
  }

  authService.profile().then(sender => {
    const chat = location.state.chat;
    callback(sender, chat);

    subscribeForUpdates(socket, sender._id, () => refreshMessagesUI(location, navigate, socket, callback));
  }).catch(e => {
    console.log(e);
    navigate('/login', {
      state: {
        redirect: '/messages',
      }
    });
  });
}