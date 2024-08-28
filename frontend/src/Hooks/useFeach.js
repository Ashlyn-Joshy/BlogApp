import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFeach = (url, requiresAuth = false) => {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const blogData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        // Include the Authorization header if the request requires authentication
        if (requiresAuth && user && user.token) {
          options.headers["Authorization"] = `Bearer ${user.token}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error while fetching blog");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    blogData();
  }, [url, user, requiresAuth]);
  return { blogs, error };
};

export default useFeach;
