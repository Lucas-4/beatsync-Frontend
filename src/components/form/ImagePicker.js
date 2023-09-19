import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./imagePicker.css";

function ImagePicker(props) {
  return (
    <div className="image-input-wrapper">
      <div className="image">
        <img src={props.defaultImage} />
      </div>
      <label className="add-image">
        <input
          className="add-image-input"
          type="file"
          onChange={(e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            props.setImageSrc(url);
            props.setImage(e.target.files[0]);
          }}
        />
        <FontAwesomeIcon icon={faImage} />
      </label>
    </div>
  );
}

export default ImagePicker;
