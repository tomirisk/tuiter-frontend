import React from "react";
import StoryItem from "./story-item";
import { findAllStories } from "../../services/story-service";

/**
 * Represents the stories component that renders list of story items.
 * @returns {JSX.Element} react component
 */
const Stories = () => {
  const stories = findAllStories();
  const privateStories = stories.filter((s) => s.visibility === "PRIVATE");
  const publicStories = stories.filter((s) => s.visibility === "PUBLIC");

  return (
    <div className="container">
      <h1>Stories</h1>
      <hr />
      <h2>Close Friends</h2>
      <div className="row">
        {privateStories.map((story) => (
          <StoryItem story={story} />
        ))}
      </div>
      <hr />
      <h2>Friends</h2>
      <div className="row">
        {publicStories.map((story) => (
          <StoryItem story={story} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
