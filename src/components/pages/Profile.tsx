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

export const Profile = () => {
  const { data: user, isLoading } = useQuery("current-user", () =>
    userApi.getCurrentUser(),
  );

  console.log(user);

  return (
    <MainLayout>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className="mx-auto flex items-center justify-center flex-col bg-[#452225] w-[400px] p-4 rounded mt-32">
          <Avatar
            className="flex items-center justify-center w-[50px] h-[50px]"
            icon={<UserOutlined rev={""} />}
            src={""}
            size="large"
          />
          <Form layout="vertical">
            <FormItem
              label={
                <Typography.Text className="text-white">email</Typography.Text>
              }
            >
              <Input type="text" value={user?.email} />
            </FormItem>
            <FormItem
              label={
                <Typography.Text className="text-white">
                  username
                </Typography.Text>
              }
            >
              <Input type="text" value={user?.username} />
            </FormItem>
            <Button
              className="bg-[#ff4d4d] border-0 hover:!text-black hover:opacity-[0.8] duration-300 text-black"
              onClick={() => notification.info({ message: "Данные сохранены" })}
            >
              Save
            </Button>
          </Form>
        </div>
      )}
    </MainLayout>
  );
};
