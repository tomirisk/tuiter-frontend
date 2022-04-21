import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import StoryItem from "./story-item";
import * as storyService from "../../services/story-service";
import * as authService from "../../services/auth-service";
import * as userService from "../../services/users-service";
import "./stories.css";
import MultiSelectUsers from "../multi-select-users";
import * as groupsService from "../../services/groups-service";

/**
 * Represents the stories component that renders list of story items uploaded by current user
 * and an option to create more stories.
 * @returns {JSX.Element} react component
 */
const MyStories = () => {
  const navigate = useNavigate();
  const [myStories, setMyStories] = useState([]);
  const [image, setImage] = useState(null);
  const [story, setStory] = useState(null);
  const [visibility, setVisibility] = useState("PUBLIC");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const refreshStories = () => {

    authService.profile().then(me => {
      storyService.findStoriesByUser(me._id).then(async (stories) => {
        stories.sort((story1, story2) => new Date(story2.postedOn).getTime() - new Date(story1.postedOn).getTime());
        setMyStories(stories);
        const groupList = await groupsService.findGroups(me._id);
        setGroups(groupList);
      });

      userService.findAllUsers().then((users) => {
        setUsers(users.filter(user => user._id !== me._id));
      })



    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/stories',
        }
      })
    });
  }

  useEffect(() => {
    refreshStories();
  }, []);

  const create = () => {
    storyService.createStory("me", selectedUsers, story, image).then(() => {
      refreshStories();
      setStory("");
      setImage(null);
    });
  }

  const visibilityOptions = [
    { value: 'PUBLIC', label: 'Public' },
    { value: 'PRIVATE', label: 'Private' }
  ];

  /**
   * Handler for user selection change
   * @param users array of selected users
   */
  const handleChange = (users) => {
    setSelectedUsers(users);
  }

  return (
    <div className="container">
      <h1>Stories</h1>
      <div className="d-flex mt-2 align-self-center">
        <textarea placeholder="Share your story" className="w-100 border" value={story}
                  onChange={(event) => setStory(event.target.value)}/>
        <div className="align-self-center ms-2">
          {
            image ?
            <label onClick={() => setImage(null)}>
              <i className="fa fa-remove fa-2x image-icon-color text-black"/>
            </label>
                  :
            <div>
              <label htmlFor="fileInput">
                <i className="fas fa-images fa-2x image-icon-color text-black"/>
              </label>
              <input id="fileInput" type="file"
                     onChange={(event) => setImage(event.target.files[0])} />
            </div>
          }
        </div>
      </div>
      <div className="d-flex mt-2 align-self-center">
        <Select defaultValue={visibilityOptions[0]} options={visibilityOptions} className="w-25"
                onChange={(option) => setVisibility(option.value)} />
        {visibility === "PRIVATE" && <div className="w-75"><MultiSelectUsers users={users} groups={groups} onChange={handleChange}/></div>}
      </div>
      <div className="d-flex mt-2 align-self-center">
        <a className={`btn btn-primary rounded-pill text-white fw-bold bg-black border-0 ${image ? '' : 'disabled'}`}
           onClick={create}>Create Story</a>
      </div>
      {
        myStories.length > 0 &&
        <div>
          <hr />
          <h2>My Stories</h2>
          <div className="row">
            {myStories.map((story) => (
              <StoryItem story={story} key={story._id} />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default MyStories;