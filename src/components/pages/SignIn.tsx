import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input, notification, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useMutation } from "react-query";
import { authApi, TAuthRequest } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";

export const SignIn = () => {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(userInfoStateSelector);

  const signInMutation = useMutation(
    async (payload: TAuthRequest) => authApi.login(payload),
    {
      onSuccess: (res) => {
        setUserInfo(res);
        localStorage.setItem("IS_LOGGED_IN", "true");
        notification.success({ message: "Успешная авторизация" });
        navigate("/profile");
      },
      onError: () => notification.error({ message: "Something went wrong" }),
    },
  );

  const onFinish = (values: TAuthRequest) => {
    signInMutation.mutate(values);
  };

  return (
    <MainLayout>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-[#452225] w-[400px] p-4 rounded mt-32"
      >
        <FormItem
          name="username"
          label={
            <Typography.Text className="text-white">username</Typography.Text>
          }
        >
          <Input type="text" />
        </FormItem>
        <FormItem
          name="password"
          label={
            <Typography.Text className="text-white">password</Typography.Text>
          }
        >
          <Input type="password" />
        </FormItem>

        <Button
          className="text-white hover:!text-grayWhite py-0"
          htmlType="submit"
        >
          Sign In
        </Button>
      </Form>
    </MainLayout>
  );
};
