import axios from "axios";
import * as mediaService from "./media-service";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const api = axios.create({ withCredentials: true });
const MESSAGES_API = `${BASE_URL}/api/messages`;

/**
 * Sends a message
 * @param sender sender user id
 * @param recipient recipient user id
 * @param message message to send
 * @param attachment attachment to send
 */
export const sendMessage = async (sender, recipient, message, attachment) => {
  const SEND_MESSAGE_API = `${BASE_URL}/api/users/${sender}/messages/${recipient}`;
  const messageParams = { message };
  if (attachment) {
    messageParams.attachmentKey = await mediaService.upload(attachment);
  }

  const response = await api.post(SEND_MESSAGE_API, messageParams);
  return response.data;
};

/**
 * delete a message
 * @param mid message id to locate message to be deleted
 */
export const deleteMessage = async (mid) => {
  const DELETE_API = `${MESSAGES_API}/${mid}`;
  const response = await api.delete(DELETE_API);
  return response.data;
};

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
};

/**
 * Sends a broadcast message
 * @param senderId sender user id
 * @param recipientIds recipient user ids
 * @param message message to send
 * @param attachment attachment to send
 */
export const sendBroadcastMessage = async (
  senderId,
  recipientIds,
  message,
  attachment
) => {
  const SEND_MESSAGE_API = `${BASE_URL}/api/users/${senderId}/messages`;
  const messageParams = { message, recipientIds };
  if (attachment) {
    messageParams.attachmentKey = await mediaService.upload(attachment);
  }

  const response = await api.post(SEND_MESSAGE_API, messageParams);
  return response.data;
};

const getMessagesFromServer = async (sender, recipient) => {
  const GET_SENT_MESSAGES_API = `${BASE_URL}/api/users/${sender}/messages/${recipient}`;
  const response = await api.get(GET_SENT_MESSAGES_API);
  return response.data;
};

export const pinMessage = async (message) => {
  const mid = message._id;
  const response = await api.put(`${MESSAGES_API}/${mid}`, message);
  return response.data;
};

export const getMessageById = async (mid) => {
  const response = await api.get(`${MESSAGES_API}/${mid}`);
  return response.data;
};

export const sendGroupMessage = async (senderId, groupId, message, attachment) => {
  // TODO : Replace by API call
};

export const getGroupMessages = async (groupId, sender) => {
  // TODO : Replace by API call and remove sender from params
  const messages = [
    {
      _id:"1",
      message:"yo group",
      sender: sender,
      group: groupId,
      sentOn: new Date("1649128438901")
    },
    {
      _id:"2",
      message:"yo group",
      sender: groupId.users[1],
      group: groupId,
      sentOn: new Date("1649128438902")
    }
  ]
  return messages;
};

/**
 * delete a group message
 * @param mid message id to locate message to be deleted
 */
export const deleteGroupMessage = async (mid) => {
  // TODO : Replace by API call
};