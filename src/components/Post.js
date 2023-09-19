import { useState } from "react";
import AddComment from "./AddComment";
import Like from "./Like";
import "./post.css";
import Reply from "./Reply";
import { Link, useNavigate } from "react-router-dom";
import DisplayMedia from "./DisplayMedia";
import ProfileCard from "./ProfileCard";

function Post(props) {
  const [commentVisible, setCommentVisibility] = useState(false);
  const navigate = useNavigate();

  function viewPost(event) {
    console.log(event.target);
    console.log(event.currentTarget);

    if (event.target === event.currentTarget) {
      navigate("/post/" + props.post_id);
    }
  }
  return (
    <div className="post" onClick={viewPost}>
      <ProfileCard
        profile_image_path={props.profile_image_path}
        username={props.username}
        display_name={props.display_name}
      />
      <p>{props.content}</p>
      {props.post_image_path && (
        <div className="post-image">
          <img
            src={
              process.env.REACT_APP_API_HOST +
              "/post_images/" +
              props.post_image_path
            }
          />
        </div>
      )}
      {/* {props.song_id === null && props.playlist_id === null ? null : (
        <DisplayMedia />
      )} */}
      {props.song_id !== null ? (
        <iframe
          style={{ borderRadius: "12px" }}
          src={
            "https://open.spotify.com/embed/track/" +
            props.song_id +
            "?utm_source=generator"
          }
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      ) : null}

      {props.playlist_id !== null ? (
        <iframe
          style={{ borderRadius: "12px" }}
          src={
            "https://open.spotify.com/embed/playlist/" +
            props.playlist_id +
            "?utm_source=generator"
          }
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      ) : null}
      <div className="actions">
        <Like
          post_id={props.post_id}
          is_liked={props.is_liked}
          likes={props.likes}
        />

        <Reply
          onClick={(event) => {
            setCommentVisibility(!commentVisible);
          }}
          comments_num={props.comments_num}
        />
      </div>
      <AddComment
        post_id={props.post_id}
        visible={commentVisible}
        setCommentVisibility={setCommentVisibility}
      />
    </div>
  );
}

export default Post;
