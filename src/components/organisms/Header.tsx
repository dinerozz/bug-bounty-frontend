import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Svglogo } from "@/components/atoms/Icons";
import { Button, Typography } from "antd";
import { useQuery } from "react-query";
import { userApi } from "@/api/userApi";

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(
    JSON.stringify(localStorage.getItem("IS_LOGGED_IN")),
  );

  const { data: user, isLoading } = useQuery("current-user", () =>
    userApi.getCurrentUser(),
  );

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
            CTF_Tasks
          </Link>
          <Link to={"/objects"} className="hover:text-white duration-300">
            Polygon_Objects
          </Link>
          <Link to={"/"} className="hover:text-white duration-300">
            Rules
          </Link>
        </nav>
        <div className="p-4 flex gap-2">
          {isLoggedIn ? (
            <Typography.Text
              className="text-white cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {user?.username}
            </Typography.Text>
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
