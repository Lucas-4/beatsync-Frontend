import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMagnifyingGlass,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { List, ListItem } from "./List";
import SearchBar from "../SearchBar";

function AttachPlaylistButton(props) {
  return (
    <div
      title="attach playlist"
      className={
        "attach-button " + (props.playlistVisible === true ? "active" : "")
      }
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faList} />
    </div>
  );
}

function AttachPlaylist(props) {
  const [playlists, setPlaylists] = useState(null);
  const [query, setQuery] = useState("");

  async function getPlaylists() {
    const res = await fetch(
      process.env.REACT_APP_API_HOST + "/search_playlist/" + query,
      {
        method: "GET",
        credentials: "include",
        headers: { "ngrok-skip-browser-warning": "any" },
      }
    );

    const data = await res.json();
    console.log(data);
    setPlaylists(data.playlists);
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
              <ListItem key={playlist.id}>
                <img
                  src={playlist.image === undefined ? "" : playlist.image.url}
                />
                <div className="info">
                  <p className="playlist-name">{playlist.name}</p>

                  <p
                    onClick={() => {
                      props.setAttachId({
                        playlist_id: playlist.id,
                        song_id: null,
                      });
                      props.setAttachedItem(playlist);
                      props.setPlaylistVisible(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperclip} />
                  </p>
                </div>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
}

export { AttachPlaylist, AttachPlaylistButton };
