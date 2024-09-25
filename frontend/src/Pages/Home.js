import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-green-800">
        Welcome to BlogSphere!
      </h1>
      <p className="text-lg text-green-600 font-semibold mt-4">
        A platform where passionate writers and avid readers come together.
        Share your thoughts, explore various topics, and engage with the
        community.
      </p>

      <Link to="/featuredblogs">
        <button className=" mt-8 bg-green-700 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition">
          View Blogs
        </button>
      </Link>
    </div>
  );
};

export default Home;
