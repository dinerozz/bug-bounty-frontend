import { Avatar, Table } from "antd";
import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";

export const Scoreboard = () => {
  const columns = [
    {
      title: "Место",
      dataIndex: "place",
      key: "place",
      width: "100px",
    },
    {
      title: "Команда",
      dataIndex: "team",
      key: "team",
      render: (text: string, record: { avatar: string }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.avatar} style={{ marginRight: 8 }} />
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

  const data = [
    {
      key: "1",
      place: 1,
      team: "1729",
      points: 1337,
      avatar: "https://placeimg.com/64/64/any",
    },
    {
      key: "2",
      place: 2,
      team: "Aupet Reborn",
      points: 1111,
      avatar: "https://placeimg.com/64/64/any",
    },
    {
      key: "3",
      place: 3,
      team: "Команда C",
      points: 555,
      avatar: "https://placeimg.com/64/64/any",
    },
  ];

  return (
    <MainLayout>
      <Card title={`Scoreboard`} subtitle="">
        <div className="mt-4 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
          <Table
            className="w-full"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </Card>
    </MainLayout>
  );
};
