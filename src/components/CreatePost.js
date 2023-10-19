import { useState } from "react";
import "./CreatePost.css";
import AttachButtons from "./attach/AttachButtons";
import { AttachPlaylist } from "./attach/AttachPlaylist";
import { AttachSong } from "./attach/AttachSong";
import DisplayAttachedItem from "./attach/DisplayAttachedItem";
import DisplayNotification from "./DisplayNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "./form/Button";

function CreatePost() {
  const [content, setContent] = useState("");
  const [songVisible, setSongVisible] = useState(false);
  const [playlistVisible, setPlaylistVisible] = useState(false);
  const [attachId, setAttachId] = useState({
    song_id: null,
    playlist_id: null,
  });
  const [notification, setNotification] = useState(null);
  const [attachedItem, setAttachedItem] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  function handleContent(e) {
    if (e) {
      setContent(e.target.value);
      if (e.target.value.trim().length === 0) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
  }

  function createPost(e) {
    e.preventDefault();
    const body = {
      content: content,
      song_id: attachId.song_id,
      playlist_id: attachId.playlist_id,
    };
    const formData = new FormData();
    formData.append("content", content);
    formData.append("song_id", attachId.song_id);
    formData.append("playlist_id", attachId.playlist_id);
    formData.append("upload", image);

    fetch(process.env.REACT_APP_API_HOST + "/posts", {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: { "ngrok-skip-browser-warning": "any" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("fetch error");
        }
        return res.json();
      })
      .then((data) => {
        setContent("");
        setAttachedItem(null);
        setAttachId({
          song_id: null,
          playlist_id: null,
        });
        setImageSrc(null);
        handleContent({ target: { value: "" } });
        setNotification({
          message: "Post created succesfully!",
          type: "success",
        });
        console.log(data);
      })
      .catch((e) => {
        setNotification({ message: "Failed to create post", type: "error" });
        console.log(e);
      });
  }
  return (
    <div className="create-post">
      <form onSubmit={createPost}>
        <textarea
          value={content}
          placeholder="Create a new post..."
          type="text"
          onChange={handleContent}
        />

        {imageSrc && (
          <div className="attached-img-wrapper">
            <img className="attached-img" src={imageSrc} autoFocus={true} />
            <FontAwesomeIcon
              onClick={() => {
                setImage(null);
                setImageSrc(null);
              }}
              className="remove-img"
              icon={faTrash}
            />
          </div>
        )}
        {attachedItem && (
          <DisplayAttachedItem
            {...attachedItem}
            setAttachedItem={setAttachedItem}
            setAttachId={setAttachId}
          />
        )}

        <div className="create-post-actions">
          <AttachButtons
            setSongVisible={setSongVisible}
            setPlaylistVisible={setPlaylistVisible}
            songVisible={songVisible}
            playlistVisible={playlistVisible}
            setImageSrc={setImageSrc}
            setImage={setImage}
          />

          <Button enabled={!buttonDisabled} type="submit" text="Post" />
        </div>

        {playlistVisible ? (
          <AttachPlaylist
            setAttachId={setAttachId}
            setAttachedItem={setAttachedItem}
            setPlaylistVisible={setPlaylistVisible}
          />
        ) : null}

        {songVisible ? (
          <AttachSong
            setAttachId={setAttachId}
            setAttachedItem={setAttachedItem}
            setSongVisible={setSongVisible}
          />
        ) : null}
      </form>
      {notification && (
        <DisplayNotification
          {...notification}
          setNotification={setNotification}
        />
      )}
    </div>
  );
}

export default CreatePost;
