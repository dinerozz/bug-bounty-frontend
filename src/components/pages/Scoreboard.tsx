import { Avatar, Table } from "antd";
import React from "react";
import MainLayout from "@/components/templates/MainLayout";

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
      <Table
        rowClassName={"custom-table-dark-row"}
        className="custom-table-dark mt-10"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </MainLayout>
  );
};
