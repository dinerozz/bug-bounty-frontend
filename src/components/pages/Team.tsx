import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Input, Typography } from "antd";

export const Team = () => {
  return (
    <MainLayout>
      <div className="mt-10 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg">
        <Typography.Text className="!text-transparent-white text-xl">
          Join team
        </Typography.Text>
        <Typography.Text className="!text-transparent-white block">
          Team leader should send you an invite-token
        </Typography.Text>
        <div className="mt-4 flex flex-col">
          <label className="text-transparent-white">Invite token</label>
          <Input
            size="small"
            className="outline-0 w-[30%] bg-[rgba(60,34,37,0.3)] text-transparent-white border-granite-gray focus:border-granite-gray hover:border-granite-gray"
          />
          <Button
            className="w-fit text-transparent-white outline-0 border-primary-text mt-2"
            size="small"
          >
            Join
          </Button>
        </div>
      </div>
      <div className="mt-5 border-solid border-[1px] border-granite-gray w-full bg-[rgba(255,255,255,0.2)] backdrop-blur-md p-5 rounded-lg">
        <Typography.Text className="!text-[#ff4d4d] text-xl">
          Create team
        </Typography.Text>
        <Typography.Text className="!text-[#ff4d4d] block">
          Only creator/leader of the team can manage team profile.
        </Typography.Text>
        <div className="mt-4 flex flex-col">
          <label className="text-[#ff4d4d]">Team name</label>
          <Input
            size="small"
            className="outline-0 w-[30%] bg-[rgba(60,34,37,0.3)] text-[#ff4d4d] border-granite-gray focus:border-granite-gray hover:border-granite-gray"
          />
          <Button
            className="w-fit text-[#ff4d4d] outline-0 border-primary-text mt-2"
            size="small"
          >
            Create team
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
