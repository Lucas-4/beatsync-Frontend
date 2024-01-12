import { Link } from "react-router-dom";
import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faUsers,
    faBell,
    faEnvelope,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
function Navigation() {
    return (
        <nav className="navigation">
            <Link to="/">
                <FontAwesomeIcon className="nav-icon" icon={faHouse} />
                <span>Home</span>
            </Link>

            <Link to="/notifications">
                <FontAwesomeIcon icon={faBell} className="nav-icon" />
                <span>Notifications</span>
            </Link>
            <Link to="/messages">
                <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
                <span>Messages</span>
            </Link>
            <Link to="/search" className="search-icon">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="nav-icon"
                />
                <span>Search</span>
            </Link>
        </nav>
    );
}

export default Navigation;
