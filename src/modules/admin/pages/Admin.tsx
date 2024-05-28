import React, { useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Tabs, TabsProps } from "antd";
import { useQuery } from "react-query";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";
import { CreateTask } from "@/components/organisms/CreateTask";
import { reportApi } from "@/api/reportApi";
import { Reports } from "@/modules/admin/organisms/Reports";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState("1");

  const { data: reports, isLoading: isReportsLoading } = useQuery(
    "admin-reports",
    () => reportApi.getAdminReports(),
    {
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err.response?.data.error }),
      enabled: activeTab === "2",
    },
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Create task",
      children: <CreateTask />,
    },
    {
      key: "2",
      label: "Reports",
      children: <Reports loading={isReportsLoading} reports={reports} />,
    },
  ];

  return (
    <MainLayout>
      <Tabs
        defaultActiveKey={activeTab}
        className=""
        size="large"
        items={tabItems}
        onChange={(v) => setActiveTab(v)}
      />
    </MainLayout>
  );
};
