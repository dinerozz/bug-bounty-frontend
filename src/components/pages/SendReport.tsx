import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Button, Form, Input, Radio, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { reportApi, TSendReportPayload } from "@/api/reportApi";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";

const options = [
  { label: "web", value: "web" },
  { label: "osint", value: "osint" },
  { label: "forensics", value: "forensics" },
];

export const SendReport = () => {
  const [category, setCategory] = useState("web");

  const sendReportMutation = useMutation(
    (payload: TSendReportPayload) => reportApi.sendReport(payload),
    {
      onSuccess: () =>
        customNotification.success({ message: "Отчет отправлен" }),
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err.response?.data?.error }),
    },
  );

  const handleSubmitReport = (payload: TSendReportPayload) => {
    sendReportMutation.mutate(payload);
  };

  return (
    <MainLayout>
      <Card title="Reports" subtitle="Отчеты">
        <Form layout="vertical" onFinish={handleSubmitReport}>
          <FormItem
            className="mt-4"
            name="title"
            label={
              <Typography.Text className="!text-start text-transparent-white">
                Тема
              </Typography.Text>
            }
          >
            <Input
              type="text"
              size="large"
              className="text-transparent-white bg-transparent max-w-[400px] border-solid border-[1px] border-granite-gray backdrop-blur-md outline-0 focus:shadow-none rounded-lg shadow-sm shadow-orange-700"
            />
          </FormItem>
          <FormItem
            className="mt-4"
            name="description"
            label={
              <Typography.Text className="!text-start text-transparent-white">
                Описание найденной уязвимости и шаги для воспроизведения
              </Typography.Text>
            }
          >
            <TextArea
              size="large"
              className="text-transparent-white bg-transparent border-[1px] w-[400px] border-solid border-granite-gray backdrop-blur-md outline-0 focus:border-[#ff7a75] hover:border-[#ff7a75] focus:shadow-0 focus:outline-0 rounded-lg shadow-sm shadow-orange-700"
            />
          </FormItem>
          <FormItem
            className="mt-4"
            name="category"
            label={
              <Typography.Text className="!text-start text-transparent-white">
                Категория
              </Typography.Text>
            }
          >
            <Radio.Group
              options={options}
              onChange={(event) => setCategory(event.target.value)}
              value={category}
              optionType="button"
              buttonStyle="solid"
              className="text-transparent-white"
            />
          </FormItem>
          <Button className="border-green-500 text-green-500" htmlType="submit">
            Отправить отчет на модерацию
          </Button>
        </Form>
      </Card>
    </MainLayout>
  );
};
