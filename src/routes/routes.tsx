import { SignUp } from "@/components/pages/SignUp";
import Home from "@/components/pages/Home";
import { SignIn } from "@/components/pages/SignIn";
import { Profile } from "@/components/pages/Profile";
import { Scoreboard } from "@/components/pages/Scoreboard";
import { Tasks } from "@/components/pages/Tasks";
import { Objects } from "@/components/pages/Objects";
import { Team } from "@/components/pages/Team";

export const privateRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/team",
    element: <Team />,
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
