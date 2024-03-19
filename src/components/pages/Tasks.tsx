import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Avatar, Button, Card, Tag, Typography } from "antd";

const tasks = [
  {
    image: "",
    name: "Catch me if you can",
    tag: "osint",
    points: 1000,
  },
  {
    image: "",
    name: "React monkey",
    tag: "web",
    points: 1000,
  },
  {
    image: "",
    name: "Snapchat",
    tag: "web",
    points: 1000,
  },
  {
    image: "",
    name: "Magic numbers",
    tag: "crypto",
    points: 1000,
  },
  {
    image: "",
    name: "Binary sum",
    tag: "reverse",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "scripting",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "forensics",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "osint",
    points: 1000,
  },
  {
    image: "",
    name: "Explore logs",
    tag: "forensics",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "osint",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "web",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "osint",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "web",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "osint",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "pwn",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "pwn",
    points: 1000,
  },
  {
    image: "",
    name: "Catch me if you can",
    tag: "scripting",
    points: 1000,
  },
];

export const Tasks = () => {
  return (
    <MainLayout>
      <Typography.Title className="text-center mt-10 !text-white">
        TASKS
      </Typography.Title>
      <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
        {tasks.map((task) => (
          <Card className="cursor-pointer bg-[#452225] border-0 w-[220px] h-[220px]">
            <div>
              <Avatar size="large" src={task.image} />
            </div>
            <div className="flex flex-col mt-2 h-[100px]">
              <Typography.Text className="text-white">
                {task.name}
              </Typography.Text>
              <Tag color="red-inverse" className="w-fit">
                {task.tag}
              </Tag>
            </div>
            <Button className="border-0 text-white border-[1px] border-dark-gray">
              Show description
            </Button>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};
