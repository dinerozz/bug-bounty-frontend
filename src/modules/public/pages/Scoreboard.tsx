import { Avatar, Table } from "antd";
import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { useQuery } from "react-query";
import { scoreboardApi } from "@/api/scoreboardApi";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";

export const Scoreboard = () => {
  const { data: scoreboard, isLoading } = useQuery(
    "scoreboard",
    () => scoreboardApi.getScoreboard(),
    {
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err.response?.data.error }),
    },
  );

  const columns = [
    {
      title: "Место",
      dataIndex: "id",
      key: "id",
      width: "100px",
    },
    {
      title: "Команда",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={""} style={{ marginRight: 8 }} />
          {text}
        </div>
      ),
      width: "300px",
    },
    {
      title: "Очки",
      dataIndex: "points",
      key: "points",
      width: "250px",
    },
  ];

  return (
    <MainLayout>
      <Card title={`Scoreboard`} subtitle="">
        <div className="mt-4 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
          <Table
            className="w-full"
            columns={columns}
            dataSource={scoreboard}
            pagination={false}
          />
        </div>
      </Card>
    </MainLayout>
  );
};
