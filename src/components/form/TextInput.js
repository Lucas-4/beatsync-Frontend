import "./textInput.css";

function TextInput(props) {
  return (
    <div className="text-input">
      <label className="text-input-label">
        {props.label}
        <input
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        <p className="text-input-error-message">{props.error_message}</p>
      </label>
    </div>
  );
}

export default TextInput;
