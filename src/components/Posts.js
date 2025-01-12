import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("Load Posts");
    getPosts()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleDelete = (id) => {
    deletePost(id)
      .then((result) => {
        setPosts(posts.filter((post) => post.id != id));
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button className="button" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
