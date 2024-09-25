import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useFeach from "../Hooks/useFeach";
import { useAuthContext } from "../Hooks/useAuthContext";

const BlogHome = () => {
  //feaching all the blog data
  const { blogs } = useFeach("/api/blog");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleWrite = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/addblog");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
        Featured Blogs
      </h1>
      <div>
        <button
          className="bg-emerald-800 text-white py-2 px-4 rounded mt-2"
          onClick={handleWrite}
        >
          Write <span className="material-symbols-outlined">draw</span>
        </button>
        {blogs &&
          blogs.map((blog) => (
            <div
              className="border-b-2 border-green-600 my-4 p-2"
              key={blog._id}
            >
              <div className="flex justify-between">
                <div>
                  <Link to={"/featuredblogs/" + blog._id}>
                    <h1 className="font-semibold uppercase text-green-800">
                      {blog.title}
                    </h1>
                  </Link>
                  <p className="font-semibold">By {blog.author}</p>
                </div>
                <Link to={"/featuredblogs/" + blog._id}>
                  <span className="material-symbols-outlined">visibility</span>
                </Link>
              </div>
              <p className="line-clamp-3">{blog.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogHome;
