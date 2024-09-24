import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useParams } from "react-router-dom";

const LikeDislike = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);

  useEffect(() => {
    const blogData = async () => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const blog = await response.json();
      setLike(blog.blogLikes);
      setDislike(blog.blogDislikes);
    };
    blogData();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blog/${id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const updatedBlog = await response.json();
      setLike(updatedBlog.blogLikes);
      setDislike(updatedBlog.blogDislikes);
    } catch (error) {
      console.error("Error liking the blog:", error.message);
    }
  };
  const handleDislike = async () => {
    try {
      const response = await fetch(`/api/blog/${id}/dislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const updatedBlog = await response.json();
      setLike(updatedBlog.blogLikes);
      setDislike(updatedBlog.blogDislikes);
    } catch (error) {
      console.error("Error liking the blog:", error.message);
    }
  };

  return (
    <div className="py-2">
      {user && (
        <>
          <button className="text-red-500 py-2 px-4 " onClick={handleLike}>
            <span class="material-symbols-outlined">thumb_up</span>{" "}
            {like.length}
          </button>
          <button
            className="text-red-500 py-2 px-4 ml-3"
            onClick={handleDislike}
          >
            <span class="material-symbols-outlined">thumb_down</span>{" "}
            {dislike.length}
          </button>
        </>
      )}
    </div>
  );
};

export default LikeDislike;
