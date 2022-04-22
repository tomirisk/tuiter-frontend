import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const api = axios.create({withCredentials: true});

/**
 * Gets the list of group for a user
 * @param uid user id
 * @param metadata metadata to fetch
 * @returns {Promise<any>} list of groups
 */
export const findGroups = async (uid, metadata) => {
  const GET_USER_GROUPS_API = `${BASE_URL}/api/users/${uid}/groups`;
  const params = {metadata};
  const response = await api.get(GET_USER_GROUPS_API, {params});
  return response.data;
}

/**
 * Updates the given group
 * @param group updated group
 * @returns {Promise<any>} Status of the update operation
 */
export const updateGroup = async (group) => {
  const UPDATE_GROUP_API = `${BASE_URL}/api/groups/${group._id}`;
  const response = await api.put(UPDATE_GROUP_API, group);
  return response.data;
}

/**
 * Creates a group
 * @param uid sender user id
 * @param  userIds user ids to create a group
 * @param group contains the group name
 */
export const createGroup = async (uid, userIds, group) => {
  const CREATE_GROUP_API = `${BASE_URL}/api/users/${uid}/groups`;
  const groupParams = {users: userIds, group};
  const response = await api.post(CREATE_GROUP_API, groupParams);
  return response.data;
}

/**
 * delete a group
 * @param gid group id to locate group to be deleted
 */
export const deleteGroup = async (gid) => {
  const DELETE_API = `${BASE_URL}/api/groups/${gid}`;
  const response = await api.delete(DELETE_API);
  return response.data;
}
