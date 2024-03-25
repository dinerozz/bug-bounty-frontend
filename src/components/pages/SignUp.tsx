import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input, notification, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useNavigate } from "react-router-dom";
import { authApi, TSignUpRequest } from "@/api/authApi";
import { useMutation } from "react-query";
import { Card } from "@/components/molecules/Card";
import customNotification from "@/utils/customNotification";

export const SignUp = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation(
    async (payload: TSignUpRequest) => authApi.signUp(payload),
    {
      onSuccess: () => {
        customNotification.success({ message: "Успешная регистрация" });
        navigate("/signin");
      },
      onError: () =>
        customNotification.error({ message: "Что-то пошло не так!" }),
    },
  );

  const onFinish = (values: TSignUpRequest) => {
    signUpMutation.mutate(values);
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-[500px]">
        <Card title="Sign Up" subtitle="">
          <Form onFinish={onFinish} layout="vertical">
            <FormItem
              name="username"
              label={
                <Typography.Text className="text-white">
                  username
                </Typography.Text>
              }
            >
              <Input type="text" />
            </FormItem>
            <FormItem
              name="email"
              label={
                <Typography.Text className="text-white">email</Typography.Text>
              }
            >
              <Input type="email" />
            </FormItem>
            <FormItem
              name="password"
              label={
                <Typography.Text className="text-white">
                  password
                </Typography.Text>
              }
            >
              <Input type="password" />
            </FormItem>
            <FormItem
              label={
                <Typography.Text className="text-white">
                  confirm password
                </Typography.Text>
              }
            >
              <Input type="password" />
            </FormItem>
            <div className="flex flex-col items-center justify-center">
              <Button
                className="text-white hover:!text-white"
                htmlType="submit"
              >
                Sign Up
              </Button>
              <Typography.Text className="text-white mt-2">or</Typography.Text>
              <Button
                type="text"
                className="text-white hover:!text-grayWhite py-0"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};
