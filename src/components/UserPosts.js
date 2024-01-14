import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

function UserPosts() {
    const [posts, setPosts] = useState();
    const params = useParams();

    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_HOST +
                "/users/" +
                params.username +
                "/posts",
            {
                method: "GET",
                credentials: "include",
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error("fetch error");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPosts(data.posts);
            });
    }, [params]);
    return (
        <div>
            {posts &&
                (posts.length === 0 ? (
                    <div className="main-child">No posts here</div>
                ) : (
                    posts.map((post) => {
                        return (
                            <Post
                                key={post.post_id}
                                display_name={post.display_name}
                                username={post.username}
                                content={post.content}
                                likes={post.likes_num}
                                is_liked={post.is_liked}
                                post_id={post.post_id}
                                comments_num={post.comments_num}
                                song_id={post.song_id}
                                playlist_id={post.playlist_id}
                                profile_image_path={post.profile_image_path}
                                post_image_path={post.post_image_path}
                                belongs_to_current_user={
                                    post.belongs_to_current_user
                                }
                            />
                        );
                    })
                ))}
        </div>
    );
}
export default UserPosts;
