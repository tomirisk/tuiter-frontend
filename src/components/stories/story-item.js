import {React} from "react";
import {Link} from "react-router-dom";
import "./stories.css";

/**
 * Returns a single story item rendered from the provided JSON object.
 * @param {JSON} story Story item JSON object to be rendered.
 * @returns {JSX.Element} react component.
 */
const StoryItem = ({ story }) => {

  return (
    <>
      <div className="col-4">
        <div className="card mt-2 mb-2">
          <Link to={`/stories/${story._id}/view`}>
            <img src={`${story.image}`} className="card-img-top story-item" />
          </Link>
          <div className="card-body">
            {story.postedBy.username && <span className="fw-bold">{story.postedBy.username}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryItem;
