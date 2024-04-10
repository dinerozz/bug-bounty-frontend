import { Button, Form, Input, Radio, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { Card } from "@/components/molecules/Card";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { taskApi, TTaskPayload } from "@/api/taskApi";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";

const options = [
  { label: "web", value: "web" },
  { label: "osint", value: "osint" },
  { label: "forensics", value: "forensics" },
];

export const CreateTask = () => {
  const [category, setCategory] = useState("Web");
  const [active, setActive] = useState(false);

  const createTaskMutation = useMutation(
    (payload: TTaskPayload) => taskApi.createTask(payload),
    {
      onSuccess: () =>
        customNotification.success({ message: "Задача создана" }),
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({
          message: "Не удалось создать задачу: " + err.response?.data.error,
        }),
    },
  );

  const handleCreateTask = (payload: TTaskPayload) => {
    const castedPayload = { ...payload, points: Number(payload.points) };
    createTaskMutation.mutate(castedPayload);
  };

  return (
    <Card
      title="Admin"
      subtitle="
            Добавить таск
      "
      className="mt-2"
    >
      <Form layout="vertical" onFinish={handleCreateTask}>
        <FormItem
          className="mt-4"
          name="isActive"
          label={
            <Typography.Text className="!text-start text-transparent-white">
              Статус
            </Typography.Text>
          }
        >
          <Radio.Group
            options={[
              { value: true, label: "active" },
              { value: false, label: "inactive" },
            ]}
            onChange={(event) => setActive(event.target.value)}
            value={active}
            optionType="button"
            buttonStyle="solid"
            className="text-transparent-white"
          />
        </FormItem>
        <FormItem
          className="mt-4"
          name="title"
          label={
            <Typography.Text className="!text-start text-transparent-white">
              Заголовок
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
              Описание
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
          name="points"
          label={
            <Typography.Text className="!text-start text-transparent-white">
              Количество очков
            </Typography.Text>
          }
        >
          <Input
            type="number"
            size="large"
            className="text-transparent-white bg-transparent max-w-[400px] border-solid border-[1px] border-granite-gray backdrop-blur-md outline-0 focus:shadow-none rounded-lg shadow-sm shadow-orange-700"
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
          Сохранить
        </Button>
      </Form>
    </Card>
  );
};
