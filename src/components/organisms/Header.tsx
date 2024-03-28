import { Link, NavLink, useNavigate } from "react-router-dom";
import { Svglogo } from "@/components/atoms/Icons";
import {
  Button,
  Dropdown,
  Menu,
  MenuProps,
  notification,
  Space,
  Typography,
} from "antd";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";
import { useMutation, useQuery } from "react-query";
import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";
import { Can } from "../atoms/Can";
import { Subject } from "@/utils/defineUserAbilities";

type TNav = {
  label: string;
  route: string;
  permission: Subject;
};

export const Header = () => {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(userInfoStateSelector);

  const isLoggedIn = Boolean(
    JSON.parse(JSON.stringify(localStorage.getItem("IS_LOGGED_IN"))),
  );

  const { data: user, isLoading } = useQuery(
    "current-user",
    () => userApi.getCurrentUser(),
    {
      onSuccess: (res) => setUserInfo(res),
      enabled: isLoggedIn,
    },
  );

  const isAdmin = user?.isAdmin;

  const logoutMutation = useMutation(async () => authApi.logout(), {
    onSuccess: () => {
      localStorage.removeItem("IS_LOGGED_IN");
      setUserInfo(null);
      navigate("/");
    },
    onError: () => notification.error({ message: "Something went wrong" }),
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const NAV_LINKS: TNav[] = [
    { label: "Home", route: "/", permission: "all" },
    { label: "Scoreboard", route: "/scoreboard", permission: "all" },
    { label: "Team", route: "/team", permission: "hasTeam" },
    { label: "Tasks", route: "/tasks", permission: "all" },
    { label: "Polygon", route: "/polygon", permission: "all" },
    { label: "Rules", route: "/rules", permission: "all" },
    { label: "Reports", route: "/reports", permission: "all" },
  ];

  const items: MenuProps["items"] = [
    {
      label: (
        <Typography.Text
          className="text-[#a2a2a4] cursor-pointer hover:text-[#4096ff]"
          onClick={() => navigate("/profile")}
        >
          profile
        </Typography.Text>
      ),
      key: "0",
    },
    {
      label: (
        <Typography.Text
          className="text-[#a2a2a4] cursor-pointer hover:text-[#4096ff]"
          onClick={() => navigate("/admin")}
        >
          admin
        </Typography.Text>
      ),
      key: "1",
    },
    {
      label: (
        <Typography.Text
          className="text-[#a2a2a4] cursor-pointer hover:text-[#4096ff]"
          onClick={() => navigate("/my-team")}
        >
          my team
        </Typography.Text>
      ),
      key: "2",
    },
    {
      label: (
        <Button
          size="small"
          className="text-[#a2a2a4] border-0 !p-0"
          onClick={() => handleLogout()}
        >
          logout
        </Button>
      ),
      key: "3",
    },
  ];

  const filteredItems = items.filter((item) => isAdmin || item?.key !== "1");

  return (
    <header className="border-b-[1px] border-b-neutral-700">
      <div className="px-10 flex justify-between items-center">
        <div className="flex flex-col items-center duration-300 cursor-pointer">
          <Link
            to="/"
            className="flex items-center justify-center text-xl font-light text-transparent-white hover:text-white duration-300"
          >
            <Svglogo fill={"currentColor"} fontSize={40} />
            POLYGON
          </Link>
          <Link to="/" className="ml-2 text-xs text-transparent-white">
            by 1729
          </Link>
        </div>

        <nav className="flex gap-4 items-center text-transparent-white text-[16px] font-light h-[30px]">
          {NAV_LINKS.map((nav, index) => {
            return (
              <Can I="read" a={nav.permission}>
                {() => (
                  <NavLink
                    key={index}
                    to={nav.route}
                    className={({ isActive }) =>
                      `hover:text-white hover:pb-1 hover:border-b border-[#ff4d4d] transition-all ${
                        isActive ? "border-b border-[#ff4d4d]" : ""
                      }`
                    }
                  >
                    {nav.label}
                  </NavLink>
                )}
              </Can>
            );
          })}
        </nav>
        <div className="p-4 flex gap-2">
          {isLoggedIn ? (
            <Dropdown
              trigger={["click"]}
              overlay={<Menu items={filteredItems} />}
              overlayClassName="!bg-[#16171b]"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-transparent-white cursor-pointer">
                  <Typography.Text className="text-transparent-white cursor-pointer">
                    {user?.username ?? "user"}
                  </Typography.Text>
                </Space>
              </a>
            </Dropdown>
          ) : (
            <>
              <Button
                className="text-white"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
              <Button
                className="text-white"
                onClick={() => navigate("/signup")}
              >
                Join
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
