import stories from "../data/stories.json";

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
