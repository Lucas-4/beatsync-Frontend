import { useEffect, useState } from "react";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import UserList from "../components/UserList";

function Following() {
    const params = useParams();
    const [users, setUsers] = useState();
    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_HOST +
                "/users/" +
                params.username +
                "/following"
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data.users);
            });
    });
    return <Main>{users && <UserList users={users} label="Following" />}</Main>;
}

export default Following;
