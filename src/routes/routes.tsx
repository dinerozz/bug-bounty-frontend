import { SignUp } from "@/components/pages/SignUp";
import Home from "@/components/pages/Home";
import { SignIn } from "@/components/pages/SignIn";
import { Profile } from "@/components/pages/Profile";
import { Scoreboard } from "@/components/pages/Scoreboard";
import { Tasks } from "@/components/pages/Tasks";
import { Objects } from "@/components/pages/Objects";
import { Team } from "@/components/pages/Team";
import { MyTeam } from "@/components/pages/MyTeam";
import { Admin } from "@/components/pages/Admin";
import { Polygon } from "@/components/pages/Polygon";
import { SendReport } from "@/components/pages/SendReport";
import { Reports } from "@/components/pages/Reports";
import { ReportDetails } from "@/components/pages/ReportDetails";

export const privateRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/my-team",
    element: <MyTeam />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/send-report",
    element: <SendReport />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/report/details/:id",
    element: <ReportDetails />,
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
  {
    path: "/polygon",
    element: <Polygon />,
  },
];
