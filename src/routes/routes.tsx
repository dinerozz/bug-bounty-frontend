import { SignUp } from "@/modules/public/pages/SignUp";
import Home from "@/modules/public/pages/Home";
import { SignIn } from "@/modules/public/pages/SignIn";
import { Profile } from "@/modules/public/pages/Profile";
import { Scoreboard } from "@/modules/public/pages/Scoreboard";
import { Tasks } from "@/modules/public/pages/Tasks";
import { Objects } from "@/modules/public/pages/Objects";
import { Team } from "@/modules/public/pages/Team";
import { MyTeam } from "@/modules/public/pages/MyTeam";
import { Admin } from "@/modules/admin/pages/Admin";
import { Polygon } from "@/modules/public/pages/Polygon";
import { SendReport } from "@/modules/public/pages/SendReport";
import { ReportsPage } from "@/modules/public/pages/ReportsPage";
import { ReportDetails as PublicReports } from "@/modules/public/pages/ReportDetails";
import { ReportDetails as AdminReports } from "@/modules/admin/pages/ReportDetails";

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
    element: <ReportsPage />,
  },
  {
    path: "/report/:id/details",
    element: <PublicReports />,
  },
  {
    path: "/admin/report/:id/details",
    element: <AdminReports />,
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
