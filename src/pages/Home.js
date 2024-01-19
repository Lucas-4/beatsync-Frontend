import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import "./home.css";
function Home() {
    const [posts, setPosts] = useState([]);
    const [lastPostId, setLastPostId] = useState();
    const loadPosts = () => {
        fetch(
            process.env.REACT_APP_API_HOST + "/posts?lastPostId=" + lastPostId,
            {
                method: "GET",
                credentials: "include",
            }
        )
            .then((res) => {
                if (!res.ok) {
                    console.log(res);
                    throw new Error("fetch error");
                }
                return res.json();
            })
            .then((data) => {
                setPosts(posts.concat(data.posts));
                setLastPostId(data.lastPostId);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <Main>
            <CreatePost />
            {posts.length === 0
                ? null
                : posts.map((post) => {
                      return (
                          <Post
                              key={post.post_id}
                              username={post.username}
                              display_name={post.display_name}
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
                  })}
            <div className="load-posts-wrapper">
                <div className="load-posts" onClick={loadPosts}>
                    Load more posts
                </div>
            </div>
        </Main>
    );
}

export default Home;
