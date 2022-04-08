import axios from "axios";
import * as mediaService from './media-service';
import stories from "../data/stories.json";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const api = axios.create({withCredentials: true});

/**
 * Creates a story
 * @param user user creating a story
 * @param story story to be created
 * @param image image of the story
 * @returns {Promise<*>}
 */
export const createStory = async (user, story, image) => {
  const CREATE_STORY_API = `${BASE_URL}/api/users/${user}/stories`;
  const storyParams = {story};
  storyParams.attachmentKey = await mediaService.upload(image);

  const response = await api.post(CREATE_STORY_API, storyParams);
  return response.data;
}

/**
 * Returns all stories from the database.
 * @returns {JSON} All stories as an array of JSON objects.
 */
export const findAllStories = () => {
  // Can use redux
  console.log("GET request for fetching all stories associated with the user.");
  return stories;
};

/**
 * Finds and returns the story object associated with the provided id.
 * @param {Number} sid ID of the story to be searched and returned from database.
 * @returns {JSON} story object.
 */
export const findStoryById = (sid) => {
  // Can use redux
  console.log("GET request for fetching story by id");
  return stories.filter((story) => story._id === parseInt(sid))[0];
};
