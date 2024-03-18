import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";

export const SignIn = () => {
  return (
    <MainLayout>
      <Form
        layout="vertical"
        className="bg-[#452225] w-[400px] p-4 rounded mt-32"
      >
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

        <Button className="text-white hover:!text-grayWhite py-0">
          Sign In
        </Button>
      </Form>
    </MainLayout>
  );
};
