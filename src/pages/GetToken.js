import { useEffect } from "react";

function getToken() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const code = url.searchParams.get("code");

    const api_url = new URL(
        process.env.REACT_APP_API_HOST + "/users/get_token/"
    );
    api_url.searchParams.append("code", code);
    const api_url_string = api_url.toString();

    fetch(api_url_string, {
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
            console.log(data);
            window.location.href = data.redirect;
        })
        .catch((e) => {
            console.log(e);
        });
}
function GetToken() {
    useEffect(() => {
        getToken();
    });
    return (
        <div>
            <h1>Get Token page</h1>
        </div>
    );
}

export default GetToken;
