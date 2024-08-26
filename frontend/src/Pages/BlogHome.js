import React from "react";
import { Link } from "react-router-dom";

import useFeach from "../Hooks/useFeach";

const BlogHome = () => {
  //feaching all the blog data
  const { blogs } = useFeach("/api/blog");

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
        Featured Blogs
      </h1>
      <div>
        {blogs &&
          blogs.map((blog) => (
            <div
              className="border border-lime-400 my-4 p-2 rounded"
              key={blog._id}
            >
              <h1 className="font-semibold">{blog.title}</h1>
              <p className="line-clamp-3">{blog.body}</p>
              <button className="bg-emerald-800 text-white py-2 px-4 rounded mt-2">
                <Link to={"/featuredblogs/" + blog._id}>Read Full Blog</Link>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogHome;
