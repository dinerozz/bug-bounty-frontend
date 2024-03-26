import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Button, Form, Input, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";

export const Admin = () => {
  return (
    <MainLayout>
      <Card title="Admin" subtitle="">
        <Typography.Text className="text-transparent-white">
          Добавить таск
          <Form layout="vertical">
            <FormItem
              className="mt-4"
              label={
                <Typography.Text className="!text-start text-transparent-white">
                  Заголовок
                </Typography.Text>
              }
            >
              <Input
                size="large"
                className="text-transparent-white bg-transparent max-w-[400px] border-solid border-[1px] border-granite-gray backdrop-blur-md outline-0 focus:shadow-none rounded-lg shadow-sm shadow-orange-700"
              />
            </FormItem>
            <FormItem
              className="mt-4"
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
            <Button className="border-green-500 text-green-500">
              Сохранить
            </Button>
          </Form>
        </Typography.Text>
      </Card>
    </MainLayout>
  );
};
