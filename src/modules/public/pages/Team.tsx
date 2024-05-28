import MainLayout from "@/components/templates/MainLayout";
import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { teamApi } from "@/api/teamApi";
import { useRecoilState } from "recoil";
import {
  teamInfoStateSelector,
  userInfoStateSelector,
} from "@/store/authState";
import { AxiosError } from "axios";
import customNotification from "@/utils/customNotification";
import { Card } from "@/components/molecules/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Team = () => {
  const [inviteToken, setInviteToken] = useState("");
  const [userInfo] = useRecoilState(userInfoStateSelector);
  const [, setTeamInfo] = useRecoilState(teamInfoStateSelector);
  const navigate = useNavigate();

  const createTeamMutation = useMutation(
    async (payload: { name: string; ownerId: string }) =>
      teamApi.createTeam(payload),
    {
      onSuccess: (res) => {
        setTeamInfo(res);
        customNotification.success({
          message: "Команда создана",
        });
        navigate("/my-team");
      },
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({
          message: err.response?.data?.error,
        }),
    },
  );
  const joinTeamMutation = useMutation(
    async (payload: { invite_token: string }) => teamApi.joinTeam(payload),
    {
      onSuccess: (res) => {
        customNotification.success({
          message: "Вы присоединились к команде",
        });
      },
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({
          message: err.response?.data?.error,
        }),
    },
  );

  const handleCreateTeam = (value: { teamName: string }) => {
    const payload = {
      name: value.teamName,
      ownerId: userInfo?.id ?? "",
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
            value={inviteToken}
            onChange={(event) => setInviteToken(event.target.value)}
            size="small"
            className="outline-0 w-[50%] bg-[rgba(60,34,37,0.3)] text-transparent-white border-granite-gray focus:border-granite-gray hover:border-granite-gray"
          />
          <Button
            className="w-fit text-green-500 outline-0 border-green-500 mt-2"
            size="small"
            onClick={() =>
              joinTeamMutation.mutate({ invite_token: inviteToken })
            }
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
              className="outline-0 w-[50%] bg-[rgba(60,34,37,0.3)] text-transparent-white border-granite-gray focus:border-granite-gray hover:border-granite-gray"
            />
          </Form.Item>

          <Button
            className="w-fit text-green-500 outline-0 border-green-500 mt-2"
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
