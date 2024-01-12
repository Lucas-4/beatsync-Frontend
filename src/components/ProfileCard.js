import "./profileCard.css";
import { Link } from "react-router-dom";

function ProfileCard(props) {
    return (
        <div className="profile-card">
            <div className="profile-image">
                <img
                    onClick={props.onClick}
                    src={
                        process.env.REACT_APP_API_HOST +
                        "/profile_images/" +
                        props.profile_image_path
                    }
                />
            </div>
            <Link to={"/profile/" + props.username} onClick={props.onClick}>
                {props.display_name}
            </Link>
        </div>
    );
}

export default ProfileCard;
