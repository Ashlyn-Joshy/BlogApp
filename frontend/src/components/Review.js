import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const Review = () => {
  const { user } = useAuthContext();
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const blogData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching blog:", error.message);
      }
    };
    blogData();
  }, [id]);

  const handleReview = async () => {
    try {
      const response = await fetch(`/api/blog/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ body: review }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the review!");
      }

      setError(null);
      setSuccess(true);
      setReview("");
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-green-800 font-bold text-2xl">Review</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Review submitted successfully!</p>
      )}

      {user && (
        <div className="m-2 p-2">
          <textarea
            className="outline p-2 w-full"
            rows={3}
            placeholder="Add to the discussion"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button
            className="text-white bg-red-500 px-4 py-2 rounded"
            onClick={handleReview}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
