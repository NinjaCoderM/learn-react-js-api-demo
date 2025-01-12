import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      editPost();
    } else {
      addPost();
    }
    setTitle("");
    setBody("");
    setEditingPost(null);
  };

  useEffect(() => {
    setTitle(editingPost ? editingPost.title : "");
    setBody(editingPost ? editingPost.body : "");
  }, [editingPost]);

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

  const editPost = () => {
    updatePost(editingPost.id, { title, body, userId: 99 })
      .then((result) => {
        console.log(result.data.id);
        setPosts(
          //[...posts.filter((post) => post.id != result.data.id), result.data,]
          posts.map((post) => (post.id === editingPost.id ? result.data : post))
        );
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
          {editingPost ? "Edit Post" : "Add Post"}
        </button>
      </div>
    </form>
  );
}
