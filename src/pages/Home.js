import Navigation from "../components/Navigation";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_HOST + "/posts", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/welcome");
          throw new Error("Unauthorized");
        }
        if (!res.ok) {
          console.log(res);
          throw new Error("fetch error");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Main>
      <CreatePost />
      {posts &&
        posts.map((post) => {
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
            />
          );
        })}
    </Main>
  );
}

export default Home;
