import { FC } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input, notification, Typography } from "antd";
import { useMutation } from "react-query";
import { authApi, TAuthRequest } from "@/api/authApi";
import { teamApi } from "@/api/teamApi";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";

const Card: FC<{ title: string; subtitle: string; children: JSX.Element }> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="mt-10 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
      <div className="bg-cyber inset-0 absolute bg-cover opacity-10 z-0" />
      <div className="z-20">
        <Typography.Text className="!text-transparent-white text-xl">
          {title}
        </Typography.Text>
        <Typography.Text className="!text-transparent-white block">
          {subtitle}
        </Typography.Text>
        {children}
      </div>
    </div>
  );
};

export const Team = () => {
  const [userInfo] = useRecoilState(userInfoStateSelector);

  const createTeamMutation = useMutation(
    async (payload: { name: string; ownerId: string }) =>
      teamApi.createTeam(payload),
    {
      onSuccess: (res) => notification.success({ message: "Success" }),
      onError: () => notification.error({ message: "Something went wrong" }),
    }
  );

  const handleCreateTeam = (value: { teamName: string }) => {
    const payload = {
      name: value.teamName,
      ownerId: userInfo?.id,
    };
    createTeamMutation.mutate(payload);
  };

  return (
    <MainLayout>
      <Card
        title="Join team"
        subtitle="Team leader should send you an invite-token"
      >
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
      </Card>

      <Card
        title="Create team"
        subtitle="Only creator/leader of the team can manage team profile."
      >
        <Form layout="vertical" className="mt-4" onFinish={handleCreateTeam}>
          <label className="text-transparent-white">Team name</label>
          <Form.Item name="teamName" className="mb-0">
            <Input
              size="small"
              className="outline-0 w-[30%] bg-[rgba(60,34,37,0.3)] text-transparent-white border-granite-gray focus:border-granite-gray hover:border-granite-gray"
            />
          </Form.Item>

          <Button
            className="w-fit text-transparent-white outline-0 border-primary-text mt-2"
            size="small"
            htmlType="submit"
          >
            Create team
          </Button>
        </Form>
      </Card>
    </MainLayout>
  );
};
