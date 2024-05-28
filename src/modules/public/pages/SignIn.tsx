import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input, notification, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useMutation } from "react-query";
import { authApi, TAuthRequest } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";
import { Card } from "@/components/molecules/Card";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";

export const SignIn = () => {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(userInfoStateSelector);

  const signInMutation = useMutation(
    async (payload: TAuthRequest) => authApi.login(payload),
    {
      onSuccess: (res) => {
        // @ts-ignore
        setUserInfo(res);
        localStorage.setItem("IS_LOGGED_IN", "true");
        customNotification.success({ message: "Успешная авторизация" });
        navigate("/profile");
      },
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err.response?.data.error }),
    },
  );

  const onFinish = (values: TAuthRequest) => {
    signInMutation.mutate(values);
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-[500px]">
        <Card title="Login" subtitle="">
          <Form onFinish={onFinish} layout="vertical">
            <FormItem
              name="username"
              label={
                <Typography.Text className="text-white">
                  username
                </Typography.Text>
              }
            >
              <Input
                type="text"
                className="text-transparent-white bg-transparent border-solid border-[1px] border-granite-gray backdrop-blur-md outline-0 focus:shadow-none rounded-lg shadow-sm shadow-orange-700"
              />
            </FormItem>
            <FormItem
              name="password"
              label={
                <Typography.Text className="text-white">
                  password
                </Typography.Text>
              }
            >
              <Input
                type="password"
                className="text-transparent-white bg-transparent border-solid border-[1px] border-granite-gray backdrop-blur-md outline-0 focus:shadow-none rounded-lg shadow-sm shadow-orange-700"
              />
            </FormItem>

            <Button
              className="text-white hover:!text-grayWhite py-0"
              htmlType="submit"
            >
              Sign In
            </Button>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};
