import { AttachPlaylistButton } from "./AttachPlaylist";
import { AttachSongButton } from "./AttachSong";
import AttachImageButton from "./AttachImage";
import "./AttachButton.css";
function AttachButtons(props) {
  return (
    <div className={"attach-bar"}>
      <AttachPlaylistButton
        playlistVisible={props.playlistVisible}
        onClick={() => {
          props.setPlaylistVisible(!props.playlistVisible);
          props.setSongVisible(false);
        }}
      />

      <AttachSongButton
        songVisible={props.songVisible}
        onClick={() => {
          props.setSongVisible(!props.songVisible);
          props.setPlaylistVisible(false);
        }}
      />
      <AttachImageButton
        setImageSrc={props.setImageSrc}
        setImage={props.setImage}
      />
    </div>
  );
}

export default AttachButtons;
