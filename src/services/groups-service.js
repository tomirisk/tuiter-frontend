import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const api = axios.create({withCredentials: true});

export const findGroups = async (uid) => {
  // TODO : Replace by API call
  const groups = [{
    _id: 1,
    name: "Some group",
    users: [
      uid,
      {
        _id:"624ba7dff49bd4d4e8650574",
        username:"harry",
        email:"harry@gmail.com",
      },
      {
        _id:"6250c7bdd611319dcf2ecd25",
        username:"ron",
        email:"ron@hogwarts.com",
      }
    ]
  }];
  return groups;
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
