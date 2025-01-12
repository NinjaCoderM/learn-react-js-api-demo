import React, { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

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
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
