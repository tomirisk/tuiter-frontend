import { React, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { findStoryById } from "../../services/story-service";

/**
 * Returns a viewable story that is chosen by the user from list of stories.
 * @returns {JSX.Element} react component.
 */
const ViewStory = () => {
  const { sid } = useParams();
  const story = findStoryById(sid);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/stories");
    }, 15000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="mt-2">
      {/* The div content will be dynamic after integrating with the user component */}
      <div className="m-2">
        <Link to={"/stories"}>
          <span className="float-end">
            <i class="fa-solid fa-2x fa-circle-xmark close-btn"></i>
          </span>
        </Link>
        <img
          src="https://d.newsweek.com/en/full/1955557/attack-titan.jpg"
          className="profile-img"
        />
        <span className="fw-bold ms-3 me-2 font-large">Eren Yeager</span>
        <span className="fw-bold">&middot;</span>
        <span className="ms-2 text-muted fw-bold font-large">
          {story.postedOn}
        </span>
      </div>
      <div className="card mt-2 mb-2">
        <img src={`${story.image}`} className="card-img-top" />
        <div className="card-body">
          <span className="fw-bold">{story.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
