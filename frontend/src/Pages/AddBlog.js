import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);

  const handlePublish = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    const article = await fetch(`/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    const json = await article.json();

    if (!article.ok) {
      setError("Error creating the blog");
    } else {
      setTitle("");
      setBody("");
      setAuthor("");
      setError(null);
      navigate(`/featuredblogs/${json._id}`);
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
        add new blog
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
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </form>

      <button className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold">
        <Link to={"/featuredblogs"}>Back</Link>
      </button>
    </div>
  );
};

export default AddBlog;
