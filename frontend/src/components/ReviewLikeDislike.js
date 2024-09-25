import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useParams } from "react-router-dom";

const ReviewLikeDislike = ({ reviewId }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);

  useEffect(() => {
    const reviewData = async () => {
      const response = await fetch(`/api/blog/${id}/review/${reviewId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const review = await response.json();
      setLike(review.reviewLikes);
      setDislike(review.reviewDislikes);
    };
    reviewData();
  }, [id, reviewId]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blog/${id}/review/${reviewId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const updatedReview = await response.json();
      setLike(updatedReview.reviewLikes);
      setDislike(updatedReview.reviewDislikes);
    } catch (error) {
      console.error("Error liking the blog:", error.message);
    }
  };
  const handleDislike = async () => {
    try {
      const response = await fetch(
        `/api/blog/${id}/review/${reviewId}/dislike`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const updatedReview = await response.json();
      setLike(updatedReview.reviewLikes);
      setDislike(updatedReview.reviewDislikes);
    } catch (error) {
      console.error("Error liking the blog:", error.message);
    }
  };

  return (
    <div className="py-2">
      {user && (
        <>
          <button className="text-red-500 py-2 px-4 " onClick={handleLike}>
            <span className="material-symbols-outlined">thumb_up</span>{" "}
            {like.length}
          </button>
          <button
            className="text-red-500 py-2 px-4 ml-3"
            onClick={handleDislike}
          >
            <span className="material-symbols-outlined">thumb_down</span>{" "}
            {dislike.length}
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewLikeDislike;
