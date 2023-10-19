import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./AttachSong.css";
import { List, ListItem } from "./List";
import SearchBar from "../SearchBar";

function AttachSongButton(props) {
  return (
    <div
      title="attach song"
      className={"attach-button " + (props.songVisible ? "active" : "")}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faMusic} />
    </div>
  );
}

function AttachSong(props) {
  const [songs, setSongs] = useState(null);
  const [query, setQuery] = useState("");
  async function getSongs() {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_HOST + "/search_song/" + query,
        {
          method: "GET",
          credentials: "include",
          headers: { "ngrok-skip-browser-warning": "any" },
        }
      );
      console.log(res);
      const data = await res.json();
      console.log(data.songs);
      setSongs(data.songs);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <SearchBar
        autoFocus={true}
        placeholder="Search for a song..."
        onClick={getSongs}
        onEnter={getSongs}
        setQuery={setQuery}
      />
      {songs && (
        <List>
          {songs.map((song) => {
            return (
              <ListItem key={song.id}>
                <img src={song.image.url} />
                <div className="info">
                  <a className="song-name" href={song.href} target="_blank">
                    {song.name}
                  </a>
                  <div>
                    {song.artists.map((artist, index) => {
                      // return index === 0 ? artist.name : ", " + artist.name;
                      return (
                        <a
                          className="artist-name"
                          href={artist.href}
                          target="_blank"
                        >
                          {index === 0 ? artist.name : ", " + artist.name}
                        </a>
                      );
                    })}
                  </div>
                  <p
                    onClick={() => {
                      props.setAttachId({
                        playlist_id: null,
                        song_id: song.id,
                      });
                      props.setAttachedItem(song);
                      props.setSongVisible(false);
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

export { AttachSong, AttachSongButton };
