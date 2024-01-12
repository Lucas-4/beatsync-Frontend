import { useState } from "react";
import "./CreatePost.css";
import "./attach/AttachButton.css";
import { AttachPlaylist, Playlist } from "./attach/AttachPlaylist";
import { AttachSong, AttachSongButton, Song } from "./attach/AttachSong";
import DisplayNotification from "./DisplayNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "./form/Button";
import AttachImageButton from "./attach/AttachImage";
import { AttachPlaylistButton } from "./attach/AttachPlaylist";

function CreatePost() {
  const [content, setContent] = useState("");
  const [attachSongVisible, setAttachSongVisible] = useState(false);
  const [attachPlaylistVisible, setAttachPlaylistVisible] = useState(false);
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

    const formData = new FormData();
    formData.append("content", content);
    formData.append(
      "song_id",
      attachedItem !== null
        ? attachedItem.song !== null
          ? attachedItem.song.id
          : null
        : null
    );
    formData.append(
      "playlist_id",
      attachedItem !== null
        ? attachedItem.playlist !== null
          ? attachedItem.playlist.id
          : null
        : null
    );
    formData.append("upload", image);

    fetch(process.env.REACT_APP_API_HOST + "/posts", {
      method: "POST",
      body: formData,
      credentials: "include",
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
        {attachedItem !== null ? (
          attachedItem.song !== null ? (
            <Song
              {...attachedItem.song}
              setAttachedItem={setAttachedItem}
              action="detach"
            />
          ) : attachedItem.playlist !== null ? (
            <Playlist
              {...attachedItem.playlist}
              setAttachedItem={setAttachedItem}
              action="detach"
            />
          ) : null
        ) : null}
        <div className="create-post-actions">
          <div className="attach-bar">
            <AttachPlaylistButton
              attachPlaylistVisible={attachPlaylistVisible}
              onClick={() => {
                setAttachPlaylistVisible(!attachPlaylistVisible);
                setAttachSongVisible(false);
              }}
            />

            <AttachSongButton
              attachSongVisible={attachSongVisible}
              onClick={() => {
                setAttachSongVisible(!attachSongVisible);
                setAttachPlaylistVisible(false);
              }}
            />
            <AttachImageButton setImageSrc={setImageSrc} setImage={setImage} />
          </div>
          <Button enabled={!buttonDisabled} type="submit" text="Post" />
        </div>

        {attachPlaylistVisible ? (
          <AttachPlaylist
            setAttachedItem={setAttachedItem}
            setAttachPlaylistVisible={setAttachPlaylistVisible}
          />
        ) : null}

        {attachSongVisible ? (
          <AttachSong
            setAttachedItem={setAttachedItem}
            setAttachSongVisible={setAttachSongVisible}
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
