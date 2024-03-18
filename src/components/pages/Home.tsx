import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Typography } from "antd";
import { Svglogo } from "@/components/atoms/Icons";
import OrangeGradient from "../../../public/assets/orange-gradient.png";

const Home = () => {
  return (
    <div className="w-full mx-auto">
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
            <Link to={"/"} className="hover:text-white duration-300">
              Scoreboard
            </Link>
            <Link to={"/"} className="hover:text-white duration-300">
              Tasks
            </Link>
            <Link to={"/"} className="hover:text-white duration-300">
              Rules
            </Link>
          </nav>
          <div className="p-4 flex gap-2">
            <Button className="text-white">Sign In</Button>
            <Button className="text-white">Join</Button>
          </div>
        </div>
      </header>
      <Layout className="w-full mx-auto bg-transparent">
        <div className="main-section">
          <div className="flex flex-col items-center justify-center py-[200px] px-0">
            <Typography.Title className="!text-[80px] !text-[#ff4d4d]">
              Cyber Polygon
            </Typography.Title>
            <Typography.Text className="!text-xl !text-white text-center">
              Elevate your cyber skills on the digital battleground. Enhance
              your security prowess <br />
              by engaging in cyber challenges that sharpen your abilities and
              foster collaboration with fellow cyber warriors.
            </Typography.Text>
            <Button className="bg-[#ff4d4d] h-[48px] mt-5 border-0 hover:!text-black hover:opacity-[0.8] duration-300 text-black">
              Get Started
            </Button>
          </div>
        </div>
        <div className="mix-blend-hard-light absolute -z-10 top-0 left-0 bottom-0 right-0">
          <img
            className="w-full h-[150%] object-cover absolute top-0 left-0 bottom-0 right-0"
            src={OrangeGradient}
            alt="gradient"
            loading="lazy"
          />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
