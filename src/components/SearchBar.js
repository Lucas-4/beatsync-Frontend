import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function SearchBar(props) {
  return (
    <div
      className={
        "search-bar" +
        (props.className !== undefined ? " " + props.className : "")
      }
    >
      <input
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            //prevent user from submitting form by clicking enter
            e.preventDefault();

            props.onEnter();
          }
        }}
      />
      <div className="search-button" onClick={props.onClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
}

export default SearchBar;
