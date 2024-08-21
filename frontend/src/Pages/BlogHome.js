import React, { useEffect, useState } from "react";

const BlogHome = () => {
  const [blogs, setBlogs] = useState(null);
  //feaching all the blog data
  useEffect(() => {
    const blogData = async () => {
      const result = await fetch("/api/blog");
      const data = await result.json();

      setBlogs(data);
    };
    blogData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
        Featured Blogs
      </h1>
      <div>
        {blogs &&
          blogs.map((blog) => (
            <div className="border border-lime-400 my-4 p-2 rounded">
              <h1 className="font-semibold">{blog.title}</h1>
              <p className="line-clamp-3">{blog.body}</p>
              <button className="bg-emerald-800 text-white py-2 px-4 rounded mt-2">
                Read Full Blog
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogHome;
