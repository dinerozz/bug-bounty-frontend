import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Avatar, Button, Tag, Typography } from "antd";
import { Card } from "@/components/molecules/Card";

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
      <div className="flex flex-wrap w-full">
        {tasks.map((task) => (
          <div className="mx-auto w-[300px] h-fit">
            <Card title={task.name} subtitle={task.tag}>
              <Typography.Text className="text-transparent-white">
                {task.points}
              </Typography.Text>
            </Card>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
