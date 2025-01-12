import React, { useState } from "react";

export default function PostForm({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <h2>Create Post</h2>
      <label>Title</label>
    </div>
  );
}
