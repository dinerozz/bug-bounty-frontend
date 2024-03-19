import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export const AuthRedirect: FC<Props> = ({ children }) => {
  const isLoggedIn = JSON.parse(
    JSON.stringify(localStorage.getItem("IS_LOGGED_IN")),
  );

  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
