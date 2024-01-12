import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./AttachSong.css";
import { List, ListItem } from "./List";
import SearchBar from "../SearchBar";

function AttachSongButton(props) {
  return (
    <div
      title="attach song"
      className={"attach-button " + (props.attachSongVisible ? "active" : "")}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faMusic} />
    </div>
  );
}

function Song({
  id,
  imgSrc,
  link,
  title,
  artistName,
  artistLink,
  action,
  setAttachedItem,
  setAttachSongVisible,
}) {
  const song = {
    id: id,
    imgSrc: imgSrc,
    link: link,
    title: title,
    artistName: artistName,
    artistLink: artistLink,
  };
  return (
    <ListItem key={id}>
      <img src={imgSrc} />
      <div className="info">
        <a className="song-name" href={link} target="_blank">
          {title}
        </a>
        <div>
          <a className="artist-name" href={artistLink} target="_blank">
            {artistName}
          </a>
        </div>
        {action === "attach" ? (
          <p
            onClick={() => {
              setAttachedItem({ song: song, playlist: null });
              setAttachSongVisible(false);
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
function AttachSong(props) {
  const [songs, setSongs] = useState(null);
  const [query, setQuery] = useState("");
  async function getSongs() {
    try {
      // eslint-disable-next-line
      DZ.api("/search/track?q=" + query, (res) => {
        console.log(res);
        setSongs(res.data);
      });
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
              <Song
                id={song.id}
                imgSrc={song.album.cover}
                link={song.link}
                title={song.title}
                artistName={song.artist.name}
                artistLink={song.artist.link}
                action="attach"
                setAttachedItem={props.setAttachedItem}
                setAttachSongVisible={props.setAttachSongVisible}
              />
            );
          })}
        </List>
      )}
    </div>
  );
}

export { AttachSong, AttachSongButton, Song };
