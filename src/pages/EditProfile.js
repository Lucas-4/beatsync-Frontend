import { useEffect, useState } from "react";
import Main from "../components/Main";
import "./editProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../components/form/TextInput";
import TextInput from "../components/form/TextInput";
import ImagePicker from "../components/form/ImagePicker";
import Button from "../components/form/Button";
import DisplayNotification from "../components/DisplayNotification";
function EditProfile() {
    const [user, setUser] = useState();
    // const [originalUser, setOriginalUser] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [image, setImage] = useState(null);
    const [notification, setNotification] = useState(null);
    const [userValidation, setUserValidation] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("display_name", user.display_name);
        formData.append("bio", user.bio);
        if (image !== null) {
            formData.append("upload", image);
        }
        fetch(process.env.REACT_APP_API_HOST + "/users", {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setNotification({ message: "User updated", type: "success" });
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
    function deleteAccount(e) {
        e.preventDefault();
        fetch(process.env.REACT_APP_API_HOST + "/users/me", {
            method: "DELETE",
            credentials: "include",
        }).then((res) => {
            if (res.status === 201) {
                window.location.pathname = "/";
            }
        });
    }
    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + "/users/me", {
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
                setUser(data.user);
                setImageSrc(
                    process.env.REACT_APP_API_HOST +
                        "/profile_images/" +
                        data.user.image_path
                );
            });
    }, []);

    return (
        <Main>
            {user && (
                <form className="edit-profile" onSubmit={handleSubmit}>
                    <ImagePicker
                        defaultImage={imageSrc}
                        setImageSrc={setImageSrc}
                        setImage={setImage}
                    />
                    <TextInput
                        label="Display Name"
                        placeholder="Display Name"
                        value={user.display_name}
                        onChange={(e) => {
                            console.log(user);
                            setUser({
                                ...user,
                                display_name: e.target.value,
                            });
                        }}
                        error_message={
                            userValidation === null
                                ? null
                                : userValidation.display_name.message
                        }
                    />
                    <TextInput
                        label="Bio"
                        placeholder="Bio"
                        value={user.bio}
                        onChange={(e) => {
                            setUser({ ...user, bio: e.target.value });
                        }}
                        error_message={
                            userValidation === null
                                ? null
                                : userValidation.bio.message
                        }
                    />
                    <Button enabled={true} type="submit" text="Save" />
                </form>
            )}
            <form class="delete-account" onSubmit={deleteAccount}>
                <Button enabled={true} type="submit" text="Delete Account" />
            </form>
            {notification && (
                <DisplayNotification
                    message={notification.message}
                    type={notification.type}
                    setNotification={setNotification}
                />
            )}
        </Main>
    );
}

export default EditProfile;
