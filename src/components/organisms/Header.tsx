import { Link, NavLink, useNavigate } from "react-router-dom";
import { Svglogo } from "@/components/atoms/Icons";
import {
  Button,
  Dropdown,
  MenuProps,
  notification,
  Space,
  Typography,
} from "antd";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";
import { useMutation } from "react-query";
import { authApi } from "@/api/authApi";

const NAV_LINKS = [
  { label: "Home", route: "/" },
  { label: "Scoreboard", route: "/scoreboard" },
  { label: "Team", route: "/team" },
  { label: "Tasks", route: "/tasks" },
  { label: "Polygon", route: "/polygon" },
  { label: "Rules", route: "/rules" },
];

export const Header = () => {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(userInfoStateSelector);

  const isLoggedIn = JSON.parse(
    JSON.stringify(localStorage.getItem("IS_LOGGED_IN")),
  );

  const [userInfo] = useRecoilState(userInfoStateSelector);

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
          onClick={() => navigate("/my-team")}
        >
          my team
        </Typography.Text>
      ),
      key: "1",
    },
    {
      label: (
        <Button
          size="small"
          className="text-[#a2a2a4] border-0"
          onClick={() => handleLogout()}
        >
          logout
        </Button>
      ),
      key: "2",
    },
  ];

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
          <Link to="/" className="text-xs text-transparent-white">
            by 1729
          </Link>
        </div>

        <nav className="flex gap-4 items-center text-transparent-white text-[16px] font-light h-[30px]">
          {NAV_LINKS.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.route}
              className={({ isActive }) => {
                console.log(nav.route, isActive);

                return `hover:text-white hover:pb-1 hover:border-b border-[#ff4d4d] transition-all ${
                  isActive ? "border-b border-[#ff4d4d]" : ""
                }`;
              }}
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 flex gap-2">
          {isLoggedIn ? (
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              overlayClassName="!bg-[#16171b]"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-transparent-white cursor-pointer">
                  <Typography.Text className="text-transparent-white cursor-pointer">
                    {userInfo?.username ?? "user"}
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
