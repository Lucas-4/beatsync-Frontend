import Navigation from "../components/Navigation";
import Main from "../components/Main";
import Header from "../components/Header";
import "./welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
function login() {
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
}

function Welcome() {
  return (
    <div>
      <h1 className="logo">
        BEAT<span>SYNC</span>
      </h1>
      <div className="intro">
        <div>
          <p>
            Welcome to BeatSync, a music-centric social platform that connects
            music lovers from around the world.
          </p>
        </div>
        <div className="sign-in" onClick={login}>
          <p>SIGN IN WITH SPOTIFY</p>
          <div>
            <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
          </div>
        </div>
      </div>

      <div className="features">
        <h1>Features</h1>
        <div>
          <p>
            <span>{">"} Community Engagement:</span> Engage with other music
            fans through posts, likes and comments. Discover new tracks based on
            what your friends are listening to, and participate in discussions
            about music trends, genres, and artists.
          </p>
        </div>
        <div>
          <p>
            <span>{">"} User Interaction:</span> Stay connected with your
            friends by following their profiles and engage with them through our
            messaging system.
          </p>
        </div>
        <div>
          <p>
            <span>{">"} Discover New People:</span> Get recommendations of users
            who share your music taste and make new friends
          </p>
        </div>
        <div>
          <p>
            <span>{">"} User Profiles:</span> Customize your profile to reflect
            your unique musical taste and personality. Add your favorite genres,
            artists, and songs to your profile, and let others get to know your
            musical preferences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
