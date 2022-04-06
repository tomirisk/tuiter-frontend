import axios from "axios";
import * as mediaService from './media-service';

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const api = axios.create({withCredentials: true});

/**
 * Sends a message
 * @param sender sender user id
 * @param recipient recipient user id
 * @param message message to send
 * @param attachment attachment to send
 */
export const sendMessage = async (sender, recipient, message, attachment) => {
  const SEND_MESSAGE_API = `${BASE_URL}/api/users/${sender}/messages/${recipient}`;
  const messageParams = {message};
  if (attachment) {
    messageParams.attachmentKey = await mediaService.upload(attachment);
  }

  const response = await api.post(SEND_MESSAGE_API, messageParams);
  return response.data;
}

/**
 * Fetches the list of messages exchanges between two users
 * @param sender sender user id
 * @param recipient recipient user id
 * @returns {Promise<*[]>}
 */
export const getMessages = async (sender, recipient) => {
  const sentMessages = await getMessagesFromServer(sender, recipient);
  const receivedMessages = await getMessagesFromServer(recipient, sender);
  return [...sentMessages, ...receivedMessages];
}

const getMessagesFromServer = async (sender, recipient) => {
  const GET_SENT_MESSAGES_API = `${BASE_URL}/api/users/${sender}/messages/${recipient}`;
  const response = await api.get(GET_SENT_MESSAGES_API);
  return response.data;
}