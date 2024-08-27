import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      //save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));
      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
      //redirect to to the history page
      navigate(-1);
      setIsLoading(false);
      setError(null);
    }
  };

  return { register, error, isLoading };
};
