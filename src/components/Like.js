import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./icon.css";

function Like(props) {
    const [likeState, setLikeState] = useState(props.is_liked);
    const [likesNum, setLikesNum] = useState(props.likes);

    async function handleClick(event) {
        event.stopPropagation();
        if (props.comment_id !== undefined) {
            if (likeState) {
                try {
                    const res = await fetch(
                        process.env.REACT_APP_API_HOST +
                            "/comments/" +
                            props.comment_id +
                            "/like",
                        {
                            method: "DELETE",
                            credentials: "include",
                        }
                    );

                    const data = await res.json();
                    if (res.ok) {
                        setLikeState(false);
                        setLikesNum(likesNum - 1);
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    const res = await fetch(
                        process.env.REACT_APP_API_HOST +
                            "/comments/" +
                            props.comment_id +
                            "/like",
                        {
                            method: "POST",
                            credentials: "include",
                        }
                    );

                    const data = await res.json();
                    console.log(data);
                    if (res.ok) {
                        setLikeState(true);
                        setLikesNum(likesNum + 1);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            return;
        }
        if (likeState) {
            try {
                const res = await fetch(
                    process.env.REACT_APP_API_HOST +
                        "/posts/" +
                        props.post_id +
                        "/like",
                    {
                        method: "DELETE",
                        credentials: "include",
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    console.log("state");
                    setLikeState(false);
                    setLikesNum(likesNum - 1);
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await fetch(
                    process.env.REACT_APP_API_HOST +
                        "/posts/" +
                        props.post_id +
                        "/like",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setLikeState(true);
                    setLikesNum(likesNum + 1);
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="like">
            <FontAwesomeIcon
                className="icon"
                onClick={handleClick}
                icon={likeState ? faHeartSolid : faHeart}
            />
            <p>{likesNum}</p>
        </div>
    );
}

export default Like;
