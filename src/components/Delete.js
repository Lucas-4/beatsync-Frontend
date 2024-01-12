import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Delete(props) {
  return (
    <div className="delete" onClick={props.onClick}>
      <FontAwesomeIcon icon={faTrash} className="icon" />
    </div>
  );
}

export default Delete;
