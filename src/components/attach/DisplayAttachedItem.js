import "./DisplayAttachedItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DisplayAttachedItem(props) {
  return (
    <div className="attached-item">
      <img src={props.album.cover} />
      <div className="info">
        <a className="song-name" href={props.link} target="_blank">
          {props.title}
        </a>
        <p className="artist-name">
          <div>
            <a className="artist-name" href={props.artist.link} target="_blank">
              {props.artist.name}
            </a>
          </div>
        </p>
        <p
          onClick={() => {
            props.setAttachedItem(null);
            props.setAttachId({ song_id: null, playlist_id: null });
          }}
        >
          <FontAwesomeIcon className="icon" icon={faTrash} />
        </p>
      </div>
    </div>
  );
}

export default DisplayAttachedItem;
