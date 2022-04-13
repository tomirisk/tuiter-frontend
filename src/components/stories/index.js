import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import StoryItem from "./story-item";
import { findAllStories } from "../../services/story-service";
import * as storyService from "../../services/story-service";
import * as authService from "../../services/auth-service";
import "./stories.css";

/**
 * Represents the stories component that renders list of story items.
 * @returns {JSX.Element} react component
 */
const Stories = () => {
  const navigate = useNavigate();
  const [privateStories, setPrivateStories] = useState([]);
  const [publicStories, setPublicStories] = useState([]);
  const [image, setImage] = useState(null);
  const [story, setStory] = useState(null);

  useEffect(() => {
    authService.profile().then(me => {
      findAllStories().then((stories) => {
        setPrivateStories(stories.filter((story) => story.visibility === "PRIVATE"));
        setPublicStories(stories.filter((story) => story.visibility === "PUBLIC"));
      });
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/stories',
        }
      })
    });
  }, []);

  const create = () => {
    storyService.createStory("me", story, image)
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
          <a className={`btn btn-primary btn-sm rounded-pill fa-pull-right text-white
               fw-bold ps-3 pe-3 bg-black border-0 ${image ? '' : 'disabled'}`} onClick={create}>
            Create Story
          </a>
        </div>
      </div>

      <hr />
      <h2>Close Friends</h2>
      <div className="row">
        {privateStories.map((story) => (
          <StoryItem story={story} key={story._id} />
        ))}
      </div>
      <hr />
      <h2>Friends</h2>
      <div className="row">
        {publicStories.map((story) => (
          <StoryItem story={story} key={story._id} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
