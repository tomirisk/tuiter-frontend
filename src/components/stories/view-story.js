import {React, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findStoryById } from "../../services/story-service";
import * as authService from "../../services/auth-service";

/**
 * Returns a viewable story that is chosen by the user from list of stories.
 * @returns {JSX.Element} react component.
 */
const ViewStory = () => {
  const { sid } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timerPromise = authService.profile().then(me => {
      findStoryById(sid).then((data) => setStory(data));
      return setTimeout(() => {
        navigate(-1);
      }, 15000);
    }).catch(e => {
      navigate('/login', {
        state: {
          redirect: '/stories',
        }
      })
    });
    return () => {
      timerPromise.then(timer => {
        clearTimeout(timer);
      });
    };
  }, []);
  return (
    <>
      {
        story &&
        <div className="mt-2">
          {/* The div content will be dynamic after integrating with the user component */}
          <div className="m-2">
            <span className="float-end" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-2x fa-circle-xmark close-btn"></i>
            </span>
            <img src={`https://avatars.dicebear.com/api/adventurer/${story.postedBy.username}.svg`} className="profile-img bg-secondary bg-opacity-50" />
            {
              <span className="fw-bold ms-3 me-2 font-large">{story.postedBy.username}</span>
            }
            <span className="fw-bold">&middot;</span>
            <span className="ms-2 text-muted fw-bold font-large">
              {new Date(story.postedOn).toLocaleTimeString(
                "en-US", {year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
          <div className="card mt-2 mb-2">
            <img src={`${story.image}`} className="card-img-top"/>
            <div className="card-body">
              <span className="fw-bold">{story.description}</span>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ViewStory;
