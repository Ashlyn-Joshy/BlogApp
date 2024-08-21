import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-5">
      <h1>The Landing of Blog App</h1>
      <button>
        <Link to={"/featuredblogs"}>View Blogs</Link>
      </button>
    </div>
  );
};

export default Home;
