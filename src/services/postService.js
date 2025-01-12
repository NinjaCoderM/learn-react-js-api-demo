import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getPosts = () => api.get("/posts");

const deletePost = (id) => api.delete("/posts/${id}");

const createPost = (post) => api.post("/posts", post);

export { getPosts, deletePost, createPost };
