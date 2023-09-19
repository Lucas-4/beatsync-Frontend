import { Link } from "react-router-dom";
import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">
        <FontAwesomeIcon className="nav-icon" icon={faHouse} />
        <span>Home</span>
      </Link>
      <Link to="#">
        <FontAwesomeIcon className="nav-icon" icon={faUsers} />
        <span>Meet People</span>
      </Link>
      <Link>
        <FontAwesomeIcon icon={faBell} className="nav-icon" />
        <span>Notifications</span>
      </Link>
      <Link>
        <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
        <span>Messages</span>
      </Link>
      <Link to="/signup">
        <span>Signup</span>
      </Link>
    </nav>
  );
}

export default Navigation;
