import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMagnifyingGlass,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { List, ListItem } from "./List";
import SearchBar from "../SearchBar";

function AttachPlaylistButton(props) {
  return (
    <div
      title="attach playlist"
      className={
        "attach-button " +
        (props.attachPlaylistVisible === true ? "active" : "")
      }
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faList} />
    </div>
  );
}

function Playlist({
  id,
  imgSrc,
  title,
  link,
  action,
  setAttachedItem,
  setAttachPlaylistVisible,
}) {
  const playlist = {
    id: id,
    imgSrc: imgSrc,
    title: title,
    link: link,
    action: action,
  };
  return (
    <ListItem key={id}>
      <img src={imgSrc} />
      <div className="info">
        <a className="playlist-name" href={link} target="_blank">
          {title}
        </a>
        {action === "attach" ? (
          <p
            onClick={() => {
              setAttachedItem({ song: null, playlist: playlist });
              setAttachPlaylistVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faPaperclip} />
          </p>
        ) : action === "detach" ? (
          <p
            onClick={() => {
              setAttachedItem(null);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </p>
        ) : null}
      </div>
    </ListItem>
  );
}
function AttachPlaylist(props) {
  const [playlists, setPlaylists] = useState(null);
  const [query, setQuery] = useState("");

  async function getPlaylists() {
    try {
      // eslint-disable-next-line
      DZ.api("/search/playlist?q=" + query, (res) => {
        console.log(res);
        setPlaylists(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <SearchBar
        autoFocus={true}
        placeholder="Search for a playlist..."
        onClick={getPlaylists}
        onEnter={getPlaylists}
        setQuery={setQuery}
      />
      {playlists && (
        <List>
          {playlists.map((playlist) => {
            return (
              <Playlist
                id={playlist.id}
                imgSrc={playlist.picture}
                title={playlist.title}
                link={playlist.link}
                action="attach"
                setAttachedItem={props.setAttachedItem}
                setAttachPlaylistVisible={props.setAttachPlaylistVisible}
              />
            );
          })}
        </List>
      )}
    </div>
  );
}

export { AttachPlaylist, AttachPlaylistButton, Playlist };
