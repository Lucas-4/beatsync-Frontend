import Navigation from "../components/Navigation";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import Header from "../components/Header";

function Home() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch(process.env.REACT_APP_API_HOST + "/posts", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("fetch error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.posts);
        setPosts(data.posts);
      })
      .catch((e) => {
        console.log(e);
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
