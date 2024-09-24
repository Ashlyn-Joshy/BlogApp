import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatRelative, subDays } from "date-fns";
import useFeach from "../Hooks/useFeach";
import { useAuthContext } from "../Hooks/useAuthContext";
import LikeDislike from "../components/LikeDislike";
import Review from "../components/Review";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  //fetch the blog data
  const { blogs: blog, error } = useFeach(`/api/blog/${id}`);
  //deleting the current blog
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const article = await fetch(`/api/blog/${blog._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (article.ok) {
      navigate("/featuredblogs");
    }
  };

  //if there is any kind of error
  if (error) {
    return (
      <div className="p-10">
        <p className="text-red-500 text-center font-bold">{error}</p>
        <button className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold">
          <Link to={"/featuredblogs"}>Back</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="p-10">
      {blog ? (
        <>
          <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
            {blog.title}
          </h1>
          <h2 className="font-semibold text-center text-emerald-600">
            {blog.author}
          </h2>
          <h4 className="text-center">
            {formatRelative(subDays(new Date(blog.createdAt), 3), new Date())}
          </h4>
          {user && blog.blogOwner === user.id && (
            <div className="text-right">
              <button
                className="bg-red-500 text-white rounded py-2 px-4 font-semibold"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold ml-2">
                <Link to={`/editblog/${blog._id}`}>Edit</Link>
              </button>
            </div>
          )}
          <p className="py-2">{blog.body}</p>
          <LikeDislike />
          <Review />
          {blog.reviews.length === 0 ? (
            <p className="py-5 font-semibold">
              There are no reviews available.
            </p>
          ) : (
            <div className="mb-5 p-5">
              {blog.reviews.map((review) => {
                return (
                  <div key={review._id} className="border p-2 rounded my-3">
                    <h3 className="font-semibold">{review.author}</h3>
                    <p className="text-xs">
                      {formatRelative(
                        subDays(new Date(review.createdAt), 3),
                        new Date()
                      )}
                    </p>
                    <p>{review.body}</p>
                  </div>
                );
              })}
            </div>
          )}
          <button className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold">
            <Link to={"/featuredblogs"}>Back</Link>
          </button>
        </>
      ) : (
        <p className="text-center text-emerald-800">Loading...</p>
      )}
    </div>
  );
};

export default SingleBlog;
