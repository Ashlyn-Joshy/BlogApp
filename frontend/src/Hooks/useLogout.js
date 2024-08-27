import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove the user from the local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
