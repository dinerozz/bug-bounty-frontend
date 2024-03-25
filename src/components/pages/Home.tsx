import React, { useEffect, useRef } from "react";
import { Button, Layout, Typography } from "antd";
import OrangeGradient from "../../../public/assets/orange-gradient.png";
import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="main-section">
        <div className="flex flex-col items-center justify-center py-[200px] px-0">
          <Typography.Title className="!text-[80px] !text-[#ff4d4d]">
            Cyber Polygon
          </Typography.Title>
          <Typography.Text className="!text-xl !text-white text-center">
            Elevate your cyber skills on the digital battleground. Enhance your
            security prowess <br />
            by engaging in cyber challenges that sharpen your abilities and
            foster collaboration with fellow cyber warriors.
          </Typography.Text>
          <Button
            className="bg-primaryColor h-[48px] mt-5 border-0 hover:!text-black hover:opacity-[0.8] duration-300 text-black"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
