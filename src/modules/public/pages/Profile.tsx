import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { useMutation, useQuery } from "react-query";
import { userApi } from "@/api/userApi";
import {
  Avatar,
  Button,
  Form,
  Input,
  notification,
  Spin,
  Typography,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { UserOutlined } from "@ant-design/icons";
import { Card } from "@/components/molecules/Card";
import customNotification from "@/utils/customNotification";

export const Profile = () => {
  const { data: user, isLoading } = useQuery("current-user", () =>
    userApi.getCurrentUser(),
  );

  return (
    <MainLayout>
      {isLoading ? (
        <Spin size="large" className="flex items-center justify-center" />
      ) : (
        <div className="max-w-[600px] mx-auto">
          <Card title="Profile" subtitle={""}>
            <Form layout="vertical">
              <FormItem
                label={
                  <Typography.Text className="text-white">
                    email
                  </Typography.Text>
                }
              >
                <Input
                  type="text"
                  className="outline-0 focus:shadow-none bg-[rgba(60,34,37,0.3)] text-transparent-white border-granite-gray focus:border-granite-gray hover:border-granite-gray"
                  value={user?.email}
                />
              </FormItem>
              <FormItem
                label={
                  <Typography.Text className="text-white">
                    username
                  </Typography.Text>
                }
              >
                <Input
                  type="text"
                  value={user?.username}
                  className="outline-0 focus:shadow-none bg-[rgba(60,34,37,0.3)] text-transparent-white border-granite-gray focus:border-granite-gray hover:border-granite-gray"
                />
              </FormItem>
              <Button
                className="bg-[#ff4d4d] border-0 hover:!text-black hover:opacity-[0.8] duration-300 text-black"
                onClick={() =>
                  customNotification.info({ message: "Данные сохранены" })
                }
              >
                Save
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};
