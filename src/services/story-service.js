import axios from "axios";
import * as mediaService from './media-service';

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
  const storyParams = {
    description: story,
    image: await mediaService.upload(image)
  };

  const response = await api.post(CREATE_STORY_API, storyParams);
  return response.data;
}

/**
 * Returns all stories from the database.
 * @returns {Promise<*>} All stories as an array of JSON objects.
 */
export const findAllStories = async () => {
  const GET_STORIES_API = `${BASE_URL}/api/stories`;
  const response = await api.get(GET_STORIES_API);
  const stories = response.data;
  await Promise.all(stories.map(async (story) => {
    story.image = await mediaService.getURL(story.image);
  }));

  return stories;
};

/**
 * Finds and returns the story object associated with the provided id.
 * @param {string} sid ID of the story to be searched and returned from database.
 * @returns {Promise<*>} story object.
 */
export const findStoryById = async (sid) => {
  const GET_STORY_API = `${BASE_URL}/api/stories/${sid}`;
  const response = await api.get(GET_STORY_API);
  const story = response.data;
  story.image = await mediaService.getURL(story.image);
  return story;
};
