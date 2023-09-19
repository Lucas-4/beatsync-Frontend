import Navigation from "../components/Navigation";
import Main from "../components/Main";
import Header from "../components/Header";

function login() {
  fetch("https://localhost:8080/users/spotify_authorize", {
    method: "GET",
    credentials: "include",
    headers: { "Content-type": "application/json" },
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
    <Main>
      <h1>Welcome</h1>
      <button onClick={login}>Login</button>
    </Main>
  );
}

export default Welcome;
