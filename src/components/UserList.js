import { useState } from "react";
import Main from "../components/Main";
import ProfileCard from "../components/ProfileCard";
import "./userList.css";

function UserList(props) {
    return (
        <div className="user-list">
            <h2>{props.label}</h2>
            {props.users.length === 0 ? (
                <p>No users</p>
            ) : (
                props.users.map((user) => {
                    return (
                        <ProfileCard
                            username={user.username}
                            display_name={user.display_name}
                            profile_image_path={user.profile_image_path}
                        />
                    );
                })
            )}
        </div>
    );
}

export default UserList;
