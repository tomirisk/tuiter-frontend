import React, {useState} from "react";
import StoryItem from "./story-item";
import { findAllStories } from "../../services/story-service";
import * as storyService from "../../services/story-service";
import "./stories.css";

/**
 * Represents the stories component that renders list of story items.
 * @returns {JSX.Element} react component
 */
const Stories = () => {
  const stories = findAllStories();
  const privateStories = stories.filter((s) => s.visibility === "PRIVATE");
  const publicStories = stories.filter((s) => s.visibility === "PUBLIC");

  const [image, setImage] = useState(null);
  const [story, setStory] = useState(null);

  const create = () => {
    storyService.createStory("me", story, image);
  }

  return (
    <div className="container">
      <h1>Stories</h1>
      <div className="d-flex mt-2">

        <div className="mt-2 w-100">
          <div className="border">
            <textarea
                placeholder="Share your story"
                className="w-100 border-0"
                onChange={(event) =>
                    setStory(event.target.value)}/>
          </div>
        </div>

        <div className="mt-2 align-self-center margin-left-8">
          {
            image ?
                <label onClick={() => setImage(null)} className="fas fa-images fa-2x image-icon-color text-black">
                  <i className="fa fa-remove"/>
                </label>
                :
                <div>
                  <label htmlFor="fileInput">
                    <i className="fas fa-images fa-2x image-icon-color text-black"/>
                  </label>
                  <input id="fileInput" type="file"
                         onChange={(event) =>
                             setImage(event.target.files[0])} />
                </div>
          }
        </div>

        <div className="mt-2 align-self-center margin-left-8">
          <a className="btn btn-primary btn-sm rounded-pill fa-pull-right text-white
               fw-bold ps-3 pe-3 bg-black border-0" onClick={create}>
            Create Story
          </a>
        </div>
      </div>

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
