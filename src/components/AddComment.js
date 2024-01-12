import { useState, useRef, useEffect } from "react";
import "./AddComment.css";
import DisplayNotification from "./DisplayNotification";

function AddComment(props) {
    const [content, setContent] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [notification, setNotification] = useState(null);
    const textarea = useRef(null);

    useEffect(() => {
        if (textarea.current) {
            textarea.current.focus();
        }
    });

    function handleChange(e) {
        if (e) {
            setContent(e.target.value);
            if (e.target.value.trim().length === 0) {
                setButtonDisabled(true);
            } else {
                setButtonDisabled(false);
            }
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if (props.comment_id !== undefined) {
            console.log(props.comment_id);
            const res = await fetch(
                process.env.REACT_APP_API_HOST +
                    "/comments/" +
                    props.comment_id,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ content: content }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.ok) {
                const data = await res.json();
                setNotification({
                    message: "Comment added succesfully",
                    type: "success",
                });
                props.setCommentVisibility(false);
                setContent("");
                console.log(data);
            }
            return;
        }

        const res = await fetch(
            process.env.REACT_APP_API_HOST +
                "/posts/" +
                props.post_id +
                "/comments",
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ content: content }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const data = await res.json();
            setNotification({
                message: "Comment added succesfully",
                type: "success",
            });
            props.setCommentVisibility(false);
            setContent("");
            handleChange({ target: { value: "" } });

            console.log(data);
        }
    }
    return (
        <>
            <div
                onClick={props.onClick}
                className={"add-comment" + (props.visible ? " visible" : "")}
                style={
                    props.visible ? { display: "block" } : { display: "none" }
                }
            >
                <form onSubmit={handleSubmit}>
                    <textarea
                        ref={textarea}
                        value={content}
                        rows="2"
                        placeholder="Add your comment..."
                        onChange={handleChange}
                    />
                    <button
                        className={buttonDisabled ? "disabled" : "enabled"}
                        disabled={buttonDisabled}
                        type="submit"
                    >
                        Add Comment
                    </button>
                </form>
            </div>
            {notification && (
                <DisplayNotification
                    {...notification}
                    setNotification={setNotification}
                />
            )}
        </>
    );
}
export default AddComment;
