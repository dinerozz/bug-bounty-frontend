import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Typography } from "antd";

export const Admin = () => {
  return (
    <MainLayout>
      <Card title="Admin" subtitle="">
        <Typography.Text className="text-transparent-white">
          Добавить таск
        </Typography.Text>
      </Card>
    </MainLayout>
  );
};
