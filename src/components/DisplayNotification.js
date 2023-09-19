import { useEffect } from "react";
import "./notification.css";
function DisplayNotification(props) {
  console.log("notified");
  useEffect(() => {
    console.log("notified 2");

    setTimeout(() => {
      props.setNotification(null);
    }, 3500);
  }, []);
  return (
    <div className={"notification " + props.type}>
      <p>{props.message}</p>
    </div>
  );
}

export default DisplayNotification;
