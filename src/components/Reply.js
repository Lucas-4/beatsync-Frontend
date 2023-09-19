import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./icon.css";
function Reply(props) {
  return (
    <div className="reply">
      <FontAwesomeIcon
        className="icon"
        onClick={props.onClick}
        icon={faComment}
      />
      <p>{props.comments_num}</p>
    </div>
  );
}

export default Reply;
