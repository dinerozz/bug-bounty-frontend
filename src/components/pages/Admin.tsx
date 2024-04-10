import React, { useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import {
  Button,
  Form,
  Input,
  Radio,
  Segmented,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { useMutation, useQuery } from "react-query";
import { taskApi, TTaskPayload } from "@/api/taskApi";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";
import { SegmentedLabeledOption, SegmentedValue } from "antd/lib/segmented";
import { CreateTask } from "@/components/organisms/CreateTask";
import { Reports } from "@/components/organisms/Reports";
import { reportApi } from "@/api/reportApi";

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
      children: (
        <Reports isAdmin loading={isReportsLoading} reports={reports} />
      ),
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
