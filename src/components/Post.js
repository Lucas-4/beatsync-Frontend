import { useState } from "react";
import AddComment from "./AddComment";
import Like from "./Like";
import "./post.css";
import Reply from "./Reply";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Delete from "./Delete";
import DisplayNotification from "./DisplayNotification";

function Post(props) {
    const [commentVisible, setCommentVisibility] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    function viewPost() {
        navigate("/post/" + props.post_id);
    }
    function deletePost(event) {
        event.stopPropagation();
        fetch(process.env.REACT_APP_API_HOST + "/posts/" + props.post_id, {
            method: "DELETE",
            credentials: "include",
        }).then((res) => {
            if (res.status === 200) {
                setNotification({
                    message: "Post deleted succesfully!",
                    type: "success",
                });
            }
        });
    }
    return (
        <div className="post" onClick={viewPost}>
            <ProfileCard
                profile_image_path={props.profile_image_path}
                username={props.username}
                display_name={props.display_name}
                onClick={(event) => {
                    event.stopPropagation();
                }}
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

            {props.song_id === null || props.song_id === undefined ? null : (
                <iframe
                    title="deezer-widget"
                    src={
                        "https://widget.deezer.com/widget/dark/track/" +
                        props.song_id
                    }
                    width="100%"
                    height="200"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media; clipboard-write"
                ></iframe>
            )}

            {props.playlist_id === null ||
            props.playlist_id === undefined ? null : (
                <iframe
                    title="deezer-widget"
                    src={
                        "https://widget.deezer.com/widget/dark/playlist/" +
                        props.playlist_id
                    }
                    width="100%"
                    height="200"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media; clipboard-write"
                ></iframe>
            )}
            <div className="actions">
                <Like
                    post_id={props.post_id}
                    is_liked={props.is_liked}
                    likes={props.likes}
                />

                <Reply
                    onClick={(event) => {
                        event.stopPropagation();
                        setCommentVisibility(!commentVisible);
                    }}
                    comments_num={props.comments_num}
                />
                {props.belongs_to_current_user ? (
                    <Delete onClick={deletePost} />
                ) : null}
            </div>
            <AddComment
                post_id={props.post_id}
                visible={commentVisible}
                setCommentVisibility={setCommentVisibility}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            />
            {notification && (
                <DisplayNotification
                    {...notification}
                    setNotification={setNotification}
                />
            )}
        </div>
    );
}

export default Post;
