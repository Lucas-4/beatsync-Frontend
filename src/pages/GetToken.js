import { Navigate } from "react-router-dom";

function getToken() {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const api_url = new URL("https://localhost:8080/users/get_token/");
  api_url.searchParams.append("code", code);
  api_url.searchParams.append("state", state);
  const api_url_string = api_url.toString();

  fetch(api_url_string, { method: "GET", credentials: "include" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("fetch error");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.userExists) {
        console.log(window.location);
        window.location.href = window.location.origin;
      } else {
        window.location.href = window.location.origin + "/signup";
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
let count = 0;
function GetToken() {
  count++;
  if (count === 2) {
    getToken();
  }
  return (
    <div>
      <h1>Get Token page</h1>
    </div>
  );
}

export default GetToken;
