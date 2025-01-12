import React, { useState } from "react";
import { createPost } from "../services/postService";

export default function PostForm({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
    setTitle("");
    setBody("");
  };

  const addPost = () => {
    createPost({ title, body, userId: 99 })
      .then((result) => {
        console.log(result.data.id);
        setPosts([
          ...posts,
          result.data,
          //{ id: result.data.id, userId: result.data.userId, title, body },
        ]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>Title</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>Description</div>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div>
        <button className="button" type="submit">
          Add Post
        </button>
      </div>
    </form>
  );
}
