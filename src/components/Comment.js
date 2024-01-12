import Reply from "./Reply";
import Like from "./Like";
import AddComment from "./AddComment";
import { useState } from "react";
import ViewReplies from "./ViewReplies";
import "./comment.css";
import ProfileCard from "./ProfileCard";

function Comment(props) {
  const [commentVisible, setCommentVisibility] = useState(false);
  const [replies, setReplies] = useState();
  return (
    <div className="comment">
      <ProfileCard
        username={props.username}
        display_name={props.display_name}
        profile_image_path={props.profile_image_path}
      />
      <p>{props.content}</p>

      <div className="actions">
        <Like
          comment_id={props.comment_id}
          is_liked={props.is_liked}
          likes={props.likes_num}
        />
        <Reply
          comments_num={props.comments_num}
          onClick={() => {
            setCommentVisibility(!commentVisible);
          }}
        />

        <ViewReplies
          comment_id={props.comment_id}
          displayReplies={setReplies}
        />
      </div>
      <AddComment
        comment_id={props.comment_id}
        visible={commentVisible}
        setCommentVisibility={setCommentVisibility}
      />
      {replies &&
        replies.map((reply) => {
          return (
            <div className="reply-box" key={reply.comment_id}>
              <Comment
                key={reply.comment_id}
                content={reply.content}
                username={reply.username}
                display_name={reply.display_name}
                comment_id={reply.comment_id}
                comments_num={reply.comments_num}
                is_liked={reply.is_liked}
                likes_num={reply.likes_num}
                profile_image_path={reply.profile_image_path}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Comment;
