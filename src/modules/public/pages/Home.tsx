import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Layout,
  Popover,
  Row,
  Timeline,
  Typography,
} from "antd";
import MainLayout from "@/components/templates/MainLayout";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import duration, { Duration } from "dayjs/plugin/duration";

interface CountdownTimerProps {
  targetDate: string;
}

dayjs.extend(duration);

const calculateTimeLeft = (targetDate: string) => {
  const difference = dayjs(targetDate).diff(dayjs());
  return dayjs.duration(difference);
};

const Home = () => {
  const targetDate = "2024-09-01 12:24:15";
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<Duration>();

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      if (newTimeLeft.asMilliseconds() <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const timeRemaining = (
    <Typography.Text className="text-transparent-white text-3xl mt-10">
      Competition starts in{" "}
      {`${formatTime(timeLeft?.days() ?? 0)} days ${formatTime(
        timeLeft?.hours() ?? 0,
      )} hours ${formatTime(timeLeft?.minutes() ?? 0)} minutes ${formatTime(
        timeLeft?.seconds() ?? 0,
      )} seconds`}
    </Typography.Text>
  );

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
          {timeRemaining}
        </div>
      </div>
      <Row gutter={16} className="flex-wrap w-full">
        <Col span={8}>
          <Card
            title={
              <Typography.Text className="text-transparent-white text-2xl">
                What is cyber polygon?
              </Typography.Text>
            }
            className="overflow-ellipsis text-transparent-white border-[1px] border-solid border-primaryColor text-xl min-h-[300px]"
            bordered={false}
          >
            Cyber Polygon is an annual online event that aims to increase global
            collaboration in combating cyber threats. It involves a series of
            simulations and discussions that engage companies, governments, and
            experts to prepare for and respond to complex cyber incidents. Learn
            about our latest exercises and how you can participate.
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <Typography.Text className="text-transparent-white text-2xl">
                Latest Threats
              </Typography.Text>
            }
            bordered={false}
            className="overflow-ellipsis text-transparent-white border-[1px] border-solid border-primaryColor text-xl min-h-[300px]"
          >
            Stay updated with the latest cybersecurity threats and
            vulnerabilities reported across the globe. This card offers
            real-time updates on potential risks, including ransomware attacks,
            phishing scams, and data breaches. Ensure your systems are secure
            with our expert tips and preventative measures.{" "}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <Typography.Text className="text-transparent-white text-2xl">
                Best Practices
              </Typography.Text>
            }
            bordered={false}
            className="overflow-ellipsis text-transparent-white border-[1px] border-solid border-primaryColor text-xl min-h-[300px]"
          >
            Explore our curated list of best practices for maintaining robust
            cybersecurity defenses. From securing your network to training
            employees about security awareness, we provide comprehensive
            guidelines to help safeguard your organization's digital assets.
            Check our resources for detailed protocols{" "}
          </Card>
        </Col>
      </Row>
      <div className="pt-20"></div>
      <Typography.Text className="text-transparent-white text-4xl">
        How do I participate?
      </Typography.Text>
      <Timeline
        className="text-transparent-white mt-6"
        items={[
          {
            children: (
              <Typography.Text className="text-transparent-white text-xl">
                <Button
                  className="border-none text-green-500 text-xl p-0"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </Button>{" "}
                your account
              </Typography.Text>
            ),
          },
          {
            children: (
              <Typography.Text className="text-transparent-white text-xl">
                Create a{" "}
                <Button
                  className="border-none text-green-500 text-xl p-0"
                  onClick={() => navigate("/team")}
                >
                  team
                </Button>{" "}
                or{" "}
                <Button
                  className="border-none text-green-500 text-xl p-0"
                  onClick={() => navigate("/team")}
                >
                  join
                </Button>{" "}
                an existing one
              </Typography.Text>
            ),
          },
          {
            children: (
              <Typography.Text className="text-transparent-white text-xl">
                Try your hand at the{" "}
                <Button
                  className="border-none text-green-500 text-xl p-0"
                  onClick={() => navigate("/tasks")}
                >
                  trial tasks
                </Button>
                .
              </Typography.Text>
            ),
          },
          {
            children: (
              <Typography.Text className="text-transparent-white text-xl">
                Just wait for the competition to start{" "}
                <Popover content={timeRemaining} className="!bg-transparent">
                  <Button
                    className="border-none text-green-500 text-xl p-0"
                    onClick={() => navigate("/")}
                  >
                    on the day and time we agreed on.{" "}
                  </Button>
                </Popover>
              </Typography.Text>
            ),
          },
          {
            children: (
              <Typography.Text className="text-transparent-white text-xl">
                Start looking for weaknesses with the team and score points for
                it, trying to take the{" "}
                <Button
                  className="border-none text-green-500 text-xl p-0"
                  onClick={() => navigate("/scoreboard")}
                >
                  lead in the rankings.
                </Button>
              </Typography.Text>
            ),
          },
        ]}
      />
      );
    </MainLayout>
  );
};

export default Home;
