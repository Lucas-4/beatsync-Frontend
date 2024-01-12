import { useEffect, useState } from "react";
import "./header.css";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
function Header() {
    const [user, setUser] = useState();
    const [signInBtn, setSignInBtn] = useState();
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
                    console.log(data.user);
                })
                .catch((error) => {
                    setSignInBtn(true);
                    console.log(error);
                });
        }
    }, []);

    const login = () => {
        fetch(process.env.REACT_APP_API_HOST + "/users/deezer_authorization", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("failed to fetch the api");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                window.location.href = data.redirect;
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const logout = () => {
        fetch(process.env.REACT_APP_API_HOST + "/users/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("failed to fetch the api");
                }
            })
            .then((data) => {
                console.log(data);
                window.location.pathname = "/";
            })
            .catch((e) => {
                console.log(e);
            });
    };
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

                <div className="menu">
                    {user && (
                        <>
                            <ProfileCard
                                profile_image_path={user.image_path}
                                username={user.username}
                                display_name={user.display_name}
                            />
                            <div className="dropdown">
                                <p onClick={logout}>Logout</p>
                            </div>
                        </>
                    )}
                    {signInBtn && (
                        <div className="signin-btn" onClick={login}>
                            Sign In
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
export default Header;
