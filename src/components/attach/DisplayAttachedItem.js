import "./DisplayAttachedItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DisplayAttachedItem(props) {
  console.log(props);
  return (
    <div className="attached-item">
      <img src={props.image.url} />
      <div className="info">
        <p className="song-name">{props.name}</p>
        <p className="artists-name">
          {props.artists === undefined
            ? null
            : props.artists.map((artist, index) => {
                return index === 0 ? artist.name : ", " + artist.name;
              })}
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
      {/* <img src={props.image.url} />
      <p>{props.name}</p>
      <p>
        {props.artists === undefined
          ? null
          : props.artists.map((artist, index) => {
              return index === 0 ? artist.name : ", " + artist.name;
            })}
      </p> */}
    </div>
  );
}

export default DisplayAttachedItem;
