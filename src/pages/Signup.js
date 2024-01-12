import { useState } from "react";
import Main from "../components/Main";
import ImagePicker from "../components/form/ImagePicker";
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";
let username = "",
    display_name = "",
    bio = "";

function handleUsername(e) {
    username = e.target.value;
}

function handleBio(e) {
    bio = e.target.value;
}

function handleDisplay_name(e) {
    display_name = e.target.value;
}

function Signup() {
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(
        process.env.REACT_APP_API_HOST +
            "/profile_images/default-profile-image.jpg"
    );
    const [userValidation, setUserValidation] = useState(null);
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (image !== null) {
            formData.append("upload", image);
        }
        formData.append("username", username);
        formData.append("display_name", display_name);
        formData.append("bio", bio);
        fetch(process.env.REACT_APP_API_HOST + "/users", {
            method: "POST",
            body: formData,
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 201) {
                    window.location.pathname = "/";
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data.userValidation) {
                    setUserValidation(data.userValidation);
                } else {
                    setUserValidation(null);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
    console.log(userValidation);
    return (
        <Main>
            <form
                style={{
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "10px",
                }}
                onSubmit={handleSubmit}
            >
                <ImagePicker
                    defaultImage={imageSrc}
                    setImageSrc={setImageSrc}
                    setImage={setImage}
                />

                <TextInput
                    label="Username"
                    onChange={handleUsername}
                    error_message={
                        userValidation === null
                            ? null
                            : userValidation.username.message
                    }
                />
                <TextInput
                    label="Display Name"
                    onChange={handleDisplay_name}
                    error_message={
                        userValidation === null
                            ? null
                            : userValidation.display_name.message
                    }
                />
                <TextInput
                    label="Bio"
                    onChange={handleBio}
                    error_message={
                        userValidation === null
                            ? null
                            : userValidation.bio.message
                    }
                />
                <Button type="submit" enabled="true" text="Save" />
            </form>
        </Main>
    );
}

export default Signup;
