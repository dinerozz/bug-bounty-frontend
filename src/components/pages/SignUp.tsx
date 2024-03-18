import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Form
        layout="vertical"
        className="bg-[#452225] w-[400px] p-4 rounded mt-32"
      >
        <FormItem
          label={
            <Typography.Text className="text-white">username</Typography.Text>
          }
        >
          <Input type="text" />
        </FormItem>
        <FormItem
          label={
            <Typography.Text className="text-white">email</Typography.Text>
          }
        >
          <Input type="email" />
        </FormItem>
        <FormItem
          label={
            <Typography.Text className="text-white">password</Typography.Text>
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
          <Button className="text-white hover:!text-white">Sign Up</Button>
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
    </MainLayout>
  );
};
