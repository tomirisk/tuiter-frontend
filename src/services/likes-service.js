import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({withCredentials: true});

/**
 * Finds all the tuits that are liked by the user
 * @param {string} userId user's id
 * @returns {Promise<AxiosResponse<any>>} response containing list of tuits
 */
export const findAllTuitsLikedByUser = (userId) =>
  api.get(`${USERS_API}/${userId}/likes`).then(response => response.data);

/**
 * Finds all the users that liked a tuit
 * @param {string} tid tuit's id
 * @returns {Promise<AxiosResponse<any>>} response containing list of users
 */
export const findAllUsersThatLikedTuit = (tid) =>
  api.get(`${TUITS_API}/${tid}/likes`).then(response => response.data);

/**
 * Toggles like on a tuit
 * @param {string} uid user's id
 * @param {string} tid tuit's id
 * @returns {Promise<AxiosResponse<any>>} status of operation
 */
export const userTogglesTuitLikes = (uid, tid) =>
  api.put(`${USERS_API}/${uid}/likes/${tid}`).then(response => response.data);
