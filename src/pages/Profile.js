import { NavLink, useParams } from "react-router-dom";
import Main from "../components/Main";
import { useEffect } from "react";
import { useState } from "react";
import "./profile.css";
import Post from "../components/Post";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUserPlus,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

function Profile(props) {
  const params = useParams();
  const [user, setUser] = useState();
  const [displayUnfollow, setDisplayUnfollow] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_HOST + "/users/" + params.username, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("fetch error");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        console.log(data);
      });
  }, [params]);

  function follow() {
    const body = { following_id: user.user_id };
    fetch(process.env.REACT_APP_API_HOST + "/users/me/following", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <Main>
        {user && (
          <div className="profile">
            <Link to="/profile/edit">
              {user.is_my_profile ? (
                <FontAwesomeIcon className="gear-icon" icon={faGear} />
              ) : null}
            </Link>
            <div className="user-info-img-wrapper">
              <div className="profile-image">
                <img
                  src={
                    process.env.REACT_APP_API_HOST +
                    "/profile_images/" +
                    user.image_path
                  }
                />
              </div>
              <div className="user-info">
                <p className="display_name">{user.display_name}</p>
                <p className="username">{"@" + user.username}</p>
              </div>
            </div>

            <p className="bio">{user.bio}</p>

            <div className="followage">
              <p className="following">
                <span>0</span> following
              </p>
              <p className="followers">
                <span>0</span> followers
              </p>
              {user.is_my_profile ? null : user.is_being_followed ? (
                <div
                  className="following-button"
                  onMouseEnter={() => {
                    setDisplayUnfollow(true);
                  }}
                  onMouseLeave={() => {
                    setDisplayUnfollow(false);
                  }}
                >
                  {displayUnfollow ? (
                    <>
                      <FontAwesomeIcon icon={faUserCheck} />
                      <p>Unfollow</p>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUserCheck} />
                      <p>Following</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="follow-button" onClick={follow}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <p>Follow</p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="bar">
          <NavLink to="" end>
            Posts
          </NavLink>
          <NavLink to="likes" end>
            Likes
          </NavLink>
          <NavLink to="songs">Songs</NavLink>
        </div>
        <Outlet />
      </Main>
    </div>
  );
}

export default Profile;
