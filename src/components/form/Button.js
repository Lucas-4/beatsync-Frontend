import "./button.css";
function Button(props) {
  return (
    <button
      className={"button" + (props.enabled ? " enabled" : " disabled")}
      disabled={!props.enabled}
      type={props.type}
    >
      {props.text}
    </button>
  );
}

export default Button;
