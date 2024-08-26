import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFeach from "../Hooks/useFeach";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);

  //fetching the blog data
  const { blogs: blog } = useFeach(`/api/blog/${id}`);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    }
  }, [blog]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, author }),
      });

      if (response.ok) {
        navigate(`/featuredblogs/${id}`);
      } else {
        setError("Failed to update the blog. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
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
      <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
        Edit blog
      </h1>
      <form className="py-4">
        <div>
          <label className="text-2xl font-bold text-emerald-800">Title</label>
          <br />
          <input
            type="text"
            className="outline outline-lime-100 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label className="text-2xl font-bold text-emerald-800">Body</label>
          <br />
          <textarea
            typeof="text"
            className="outline outline-lime-100 rounded w-full"
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="text-2xl font-bold text-emerald-800">Author</label>
          <br />
          <input
            type="text"
            className="outline outline-lime-100 rounded w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div className="pt-4 text-center">
          <button
            className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </form>

      <button className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold">
        <Link to={"/featuredblogs"}>Back</Link>
      </button>
    </div>
  );
};

export default EditBlog;
