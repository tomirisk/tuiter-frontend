import axios from "axios";
import * as mediaService from './media-service';

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const api = axios.create({withCredentials: true});

/**
 * Creates a story
 * @param user user creating a story
 * @param selectedUsers list of users who can view the story. If that list is
 * empty, story is available to public
 * @param story story to be created
 * @param image image of the story
 * @returns {Promise<*>}
 */
export const createStory = async (user, selectedUsers, story, image) => {
  const CREATE_STORY_API = `${BASE_URL}/api/users/${user}/stories`;
  const storyParams = {
    description: story,
    viewers: selectedUsers,
    image: await mediaService.upload(image)
  };

  const response = await api.post(CREATE_STORY_API, storyParams);
  return response.data;
}

/**
 * Finds and returns the story object associated with the provided id.
 * @param {string} sid Primary key of the story to be searched and returned from database.
 * @returns {Promise<*>} story object.
 */
export const findStoryById = async (sid) => {
  const GET_STORY_API = `${BASE_URL}/api/stories/${sid}`;
  const response = await api.get(GET_STORY_API);
  const story = response.data;
  story.image = await mediaService.getURL(story.image);
  return story;
};

/**
 * Finds and returns the array of story objects that are visible to the
 * particular user
 * @param {string} uid Primary key of the user
 * @returns {Promise<any>} stories as an array of JSON objects
 */
export const findStoriesVisibleToUser = async (uid, hours) => {
  const params = {};
  if(hours) {
    params.hours = hours;
  }
  const GET_STORY_API = `${BASE_URL}/api/users/${uid}/stories`;
  const response = await api.get(GET_STORY_API, {params});
  const stories = response.data;
  await Promise.all(stories.map(async (story) => {
    story.image = await mediaService.getURL(story.image);
  }));
  return stories;
};

/**
 * Finds and returns the array of story objects that are created by the
 * given user
 * @param {string} uid Primary key of the user
 * @returns {Promise<any>} stories as an array of JSON objects
 */
export const findStoriesByUser = async (uid) => {
  const GET_STORY_API = `${BASE_URL}/api/users/${uid}/my-stories`;
  const response = await api.get(GET_STORY_API);
  const stories = response.data;
  await Promise.all(stories.map(async (story) => {
    story.image = await mediaService.getURL(story.image);
  }));
  return stories;
}
