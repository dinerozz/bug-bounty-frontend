import { Navigate } from "react-router-dom";
import { FC } from "react";

export const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const isLoggedIn = JSON.parse(
    JSON.stringify(localStorage.getItem("IS_LOGGED_IN")),
  );

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
