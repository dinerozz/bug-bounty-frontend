import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <Button
          size="small"
          className="text-[#a2a2a4] border-0"
          onClick={() => handleLogout()}
        >
          logout
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <header className="border-b-[1px] border-b-neutral-700">
      <div className="px-10 flex justify-between items-center">
        <div className="flex flex-col items-center duration-300 cursor-pointer">
          <Link
            to="/"
            className="flex items-center justify-center text-xl font-light text-[#a2a2a4] hover:text-white duration-300"
          >
            <Svglogo fill={"currentColor"} fontSize={40} />
            POLYGON
          </Link>
          <Link to="/" className="text-xs text-[#a2a2a4]">
            by 1729
          </Link>
        </div>
        <nav className="flex gap-4 text-[#a2a2a4] text-[16px] font-light">
          <Link to={"/"} className="hover:text-white duration-300">
            Home
          </Link>
          <Link to={"/scoreboard"} className="hover:text-white duration-300">
            Scoreboard
          </Link>
          <Link to={"/"} className="hover:text-white duration-300">
            Team
          </Link>
          <Link to={"/tasks"} className="hover:text-white duration-300">
            Tasks
          </Link>
          <Link to={"/objects"} className="hover:text-white duration-300">
            Polygon
          </Link>
          <Link to={"/"} className="hover:text-white duration-300">
            Rules
          </Link>
        </nav>
        <div className="p-4 flex gap-2">
          {isLoggedIn ? (
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              overlayClassName="!bg-[#16171b]"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-[#a2a2a4] cursor-pointer">
                  <Typography.Text className="text-[#a2a2a4] cursor-pointer">
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
