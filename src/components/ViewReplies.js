import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

function ViewReplies(props) {
    const [repliesVisible, setRepliesVisible] = useState(false);

    async function getReplies() {
        if (repliesVisible) {
            props.displayReplies([]);
            setRepliesVisible(!repliesVisible);
            return;
        }
        try {
            const res = await fetch(
                process.env.REACT_APP_API_HOST +
                    "/comments/" +
                    props.comment_id,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await res.json();
            console.log(data);
            setRepliesVisible(!repliesVisible);
            props.displayReplies(data.replies);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="view-replies">
            <FontAwesomeIcon
                className="icon"
                onClick={getReplies}
                icon={repliesVisible ? faEyeSlash : faEye}
            />
        </div>
    );
}
export default ViewReplies;
