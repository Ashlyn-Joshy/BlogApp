import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatRelative, subDays } from "date-fns";

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  //user info
  useEffect(() => {
    const userData = async () => {
      const response = await fetch(`/api/user/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const userInfo = await response.json();
      setUser(userInfo);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    };
    userData();
  }, [id]);
  return (
    <div className="p-10">
      {user ? (
        <>
          <div className="text-center text-xl text-green-800 pb-5 border-b-2">
            <h1 className="uppercase font-bold">{user.name}</h1>
            <p className="font-semibold">{user.email}</p>
          </div>
          <p className="font-semibold uppercase pt-5 text-xl text-green-800">
            Featured Blogs
          </p>
          <div className="grid gap-5 m-5 md:grid-cols-3">
            {user.blogs.length === 0 ? (
              <p className="p-5 font-semibold">No blogs posted</p>
            ) : (
              user.blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border border-green-600 my-4 p-2"
                >
                  <div className="flex justify-between">
                    <p className="font-semibold uppercase">{blog.title}</p>
                    <Link to={`/featuredblogs/${blog._id}`}>
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </Link>
                  </div>
                  <p className="text-sm">
                    {formatRelative(
                      subDays(new Date(blog.createdAt), 3),
                      new Date()
                    )}
                  </p>
                  <p className="line-clamp-3">{blog.body}</p>
                </div>
              ))
            )}
          </div>
          <p className="font-semibold uppercase pt-5 text-xl text-green-800">
            Recent comments
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {user.reviews.length === 0 ? (
              <p className="p-5 font-semibold">No comments posted</p>
            ) : (
              user.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-green-600 my-4 p-2"
                >
                  <div className="flex justify-between">
                    <p>{review.body}</p>
                    <Link to={`/featuredblogs/${review.blogInfo}`}>
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </Link>
                  </div>
                  <p className="text-sm">
                    {formatRelative(
                      subDays(new Date(review.createdAt), 3),
                      new Date()
                    )}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>No user data available.</p>
      )}
      <button className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold">
        <Link to={"/featuredblogs"}>
          <span className="material-symbols-outlined">keyboard_return</span>
        </Link>
      </button>
    </div>
  );
};

export default UserInfo;
