import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Comment from "../components/Comment";
import Main from "../components/Main";
import Header from "../components/Header";

function ViewPost() {
    const [post, setPost] = useState();
    const [comments, setComments] = useState();

    const params = useParams();
    const post_id = params.id;
    console.log(post_id);
    useEffect(() => {
        async function getPost() {
            const res = await fetch(
                process.env.REACT_APP_API_HOST + "/posts/" + post_id,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await res.json();
            console.log(data.post);
            setPost(data.post);
        }
        getPost();

        async function getComments() {
            const res = await fetch(
                process.env.REACT_APP_API_HOST +
                    "/posts/" +
                    post_id +
                    "/comments",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await res.json();

            console.log(data);
            setComments(data.comments);
        }
        getComments();
    }, []);

    return (
        <Main>
            {post === undefined ? null : (
                <Post
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
                    belongs_to_user={post.belongs_to_user}
                />
            )}
            {comments === undefined
                ? null
                : comments.map((comment) => {
                      return (
                          <Comment
                              key={comment.comment_id}
                              username={comment.username}
                              display_name={comment.display_name}
                              content={comment.content}
                              comment_id={comment.comment_id}
                              comments_num={comment.comments_num}
                              is_liked={comment.is_liked}
                              likes_num={comment.likes_num}
                              profile_image_path={comment.profile_image_path}
                          />
                      );
                  })}
        </Main>
    );
}

export default ViewPost;
