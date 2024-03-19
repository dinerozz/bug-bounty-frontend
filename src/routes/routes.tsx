import { SignUp } from "@/components/pages/SignUp";
import Home from "@/components/pages/Home";
import { SignIn } from "@/components/pages/SignIn";
import { Profile } from "@/components/pages/Profile";
import { Scoreboard } from "@/components/pages/Scoreboard";
import { Tasks } from "@/components/pages/Tasks";
import { Objects } from "@/components/pages/Objects";

export const privateRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
];

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
  {
    path: "/scoreboard",
    element: <Scoreboard />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/objects",
    element: <Objects />,
  },
];
