import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";

// Helper function to handle API requests
const apiRequest = async (method, url, data, token) => {
  const config = {
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await request(config);
};

// Fetch Posts Based On Page Number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("get", `/api/posts?pageNumber=${pageNumber}`, null, token);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Get Posts Count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("get", `/api/posts/count`, null, token);
      dispatch(postActions.setPostsCount(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Fetch Posts Based On Category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("get", `/api/posts?category=${category}`, null, token);
      dispatch(postActions.setPostsCate(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Create Post (without image)
export function createPost(newPost) {
  return async (dispatch) => {
    try {
      dispatch(postActions.setLoading());
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      await apiRequest("post", `/api/posts`, newPost, token);

      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000); // Clear state after 2s
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      dispatch(postActions.clearLoading());
    }
  };
}

// Fetch Single Post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("get", `/api/posts/${postId}`, null, token);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Toggle Like Post
export function toggleLikePost(postId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("put", `/api/posts/like/${postId}`, {}, token);
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Update Post (without image)
export function updatePost(newPost, postId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("put", `/api/posts/${postId}`, newPost, token);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Delete Post
export function deletePost(postId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("delete", `/api/posts/${postId}`, null, token);
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}

// Get All Posts
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await apiRequest("get", `/api/posts`, null, token);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
}
