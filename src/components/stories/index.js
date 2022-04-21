import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import StoryItem from "./story-item";
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

  useEffect(() => {
    authService.profile().then(me => {
      storyService.findStoriesVisibleToUser(me._id, 24).then((stories) => {
        stories.sort((story1, story2) => new Date(story2.postedOn).getTime() - new Date(story1.postedOn).getTime());
        setPrivateStories(stories.filter((story) => story.postedBy._id !== me._id && story.viewers.length >= 1));
        setPublicStories(stories.filter((story) => story.postedBy._id !== me._id && story.viewers.length < 1));
      });
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/stories',
        }
      })
    });
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Stories</h1>
        <Link to="my-stories" className="btn btn-primary rounded-pill my-story">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-plus m-2" />
            <span>My Stories</span>
          </div>
        </Link>
      </div>
      {
        privateStories.length > 0 &&
        <div>
          <hr />
          <h2>Private Stories</h2>
          <div className="row">
            {privateStories.map((story) => (
              <StoryItem story={story} key={story._id} />
            ))}
          </div>
        </div>
      }
      {
        publicStories.length > 0 &&
        <div>
          <hr />
          <h2>Public Stories</h2>
          <div className="row">
            {publicStories.map((story) => (
              <StoryItem story={story} key={story._id} />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Stories;
