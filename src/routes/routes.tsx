import { SignUp } from "@/components/pages/SignUp";
import Home from "@/components/pages/Home";
import { SignIn } from "@/components/pages/SignIn";

export const privateRoutes = [];

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
];
