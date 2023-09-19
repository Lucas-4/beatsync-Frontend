import { useEffect, useState } from "react";
import "./header.css";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
import { Outlet } from "react-router-dom";
function Header() {
  const [user, setUser] = useState();
  const [query, setQuery] = useState("");
  useEffect(() => {
    {
      fetch(process.env.REACT_APP_API_HOST + "/users/me", {
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
