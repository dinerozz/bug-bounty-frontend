import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Avatar, Button, Tag, Typography } from "antd";
import { Card } from "@/components/molecules/Card";
import { useQuery } from "react-query";
import { taskApi } from "@/api/taskApi";

export const Tasks = () => {
  const { data: tasks, isLoading } = useQuery("tasks", () =>
    taskApi.getTasks(),
  );

  if (!tasks) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center fixed top-1/3 left-[33%]">
          <Card title="">
            <Typography.Text className="flex justify-center items-center text-primaryColor font-bold text-6xl">
              The tasks haven't been added yet.
            </Typography.Text>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography.Title className="text-center mt-10 !text-white">
        TASKS
      </Typography.Title>
      <div className="flex flex-wrap w-full">
        {tasks?.map((task) => (
          <div className="mx-auto w-[300px] h-fit">
            <Card title={task.title} subtitle={`Active: ${task.isActive}`}>
              <Typography.Text className="text-transparent-white">
                {task.description}
              </Typography.Text>
            </Card>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
