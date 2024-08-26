import { useEffect, useState } from "react";

const useFeach = (url) => {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const blogData = async () => {
      try {
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
  }, [url]);
  return { blogs, error };
};

export default useFeach;
