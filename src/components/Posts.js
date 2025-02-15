import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import PostForm from "./PostForm";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  useEffect(() => {
    console.log("Load Posts");
    getPosts()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleDelete = (id) => {
    setLoadingIds((prev) => [...prev, id]);
    deletePost(id)
      .then((result) => {
        setPosts(posts.filter((post) => post.id != id));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
      });
  };

  const handleEditStart = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      ></PostForm>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleEditStart(post)}>Edit</button>
            <button className="button" onClick={() => handleDelete(post.id)}>
              {loadingIds.includes(post.id) ? (
                <span className="spinner"></span>
              ) : (
                "Delete Post"
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
