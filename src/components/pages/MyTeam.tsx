import { FC } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Button, Typography } from "antd";

export const MyTeam: FC = () => {
  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto">
        <Card title="My team" subtitle="Team token">
          <div className="mt-4 flex items-center justify-between">
            <Typography.Text className="text-transparent-white">
              Share the invite token with the team
            </Typography.Text>
            <Button className="text-green-500 border-green-500">
              show invite token
            </Button>
          </div>
        </Card>
        <Card title="Team profile" subtitle="">
          <div className="mt-4 flex items-center justify-between"></div>
        </Card>
      </div>
    </MainLayout>
  );
};
