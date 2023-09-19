import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AttachImageButton(props) {
  return (
    <div className="attach-button" title="attach image">
      <label className="attach-image">
        <input
          className="post-image-input"
          onChange={(e) => {
            console.log(e.target.files[0]);
            props.setImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            console.log(url);
            props.setImageSrc(url);
          }}
          type="file"
        />
        <FontAwesomeIcon icon={faImage} />
      </label>
    </div>
  );
}

export default AttachImageButton;
