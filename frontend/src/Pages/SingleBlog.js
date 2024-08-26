import React from "react";
import { Link, useParams } from "react-router-dom";
import { formatRelative, subDays } from "date-fns";
import useFeach from "../Hooks/useFeach";

const SingleBlog = () => {
  const { id } = useParams();

  //fetch the blog data
  const { blogs: blog, error } = useFeach(`/api/blog/${id}`);

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
          <p className="py-2">{blog.body}</p>
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
