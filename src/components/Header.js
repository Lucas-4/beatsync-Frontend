import { useEffect, useState } from "react";
import "./header.css";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
import { Outlet, useNavigate } from "react-router-dom";
function Header() {
  const [user, setUser] = useState();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    {
      fetch(process.env.REACT_APP_API_HOST + "/users/me", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 401) {
            navigate("/welcome");
            throw new Error("Unauthorized");
          }
          if (!res.ok) {
            throw new Error("fetch error");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <header>
        <h1>BEATSYNC</h1>
        <SearchBar
          className="search-app"
          placeholder="Search..."
          setQuery={setQuery}
          onEnter={setQuery}
        />
        {user && (
          <div className="menu">
            <ProfileCard
              profile_image_path={user.image_path}
              username={user.username}
              display_name={user.display_name}
            />
            <div className="dropdown">
              <p>Logout</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
export default Header;
