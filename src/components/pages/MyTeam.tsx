import { FC, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Button, Input, Modal, Typography } from "antd";
import { useRecoilState } from "recoil";
import {
  teamInfoStateSelector,
  userInfoStateSelector,
} from "@/store/authState";
import customNotification from "@/utils/customNotification";
import { useMutation } from "react-query";
import { teamApi } from "@/api/teamApi";
import { AxiosError } from "axios";

export const MyTeam: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo] = useRecoilState(userInfoStateSelector);
  const [teamInfo, setTeamInfo] = useRecoilState(teamInfoStateSelector);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const resetInviteTokenMutation = useMutation(
    async () => teamApi.resetInviteToken(),
    {
      onSuccess: (res) => {
        setTeamInfo((currentInfo) => {
          if (currentInfo === null) {
            return null;
          }
          return {
            ...currentInfo,
            invite_token: res.invite_token ?? "",
          };
        });
        customNotification.success({
          message: "invite-token обновлен",
        });
      },
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({
          message: err.response?.data?.error,
        }),
    },
  );

  const handleCopyClick = () => {
    const inviteToken = teamInfo?.invite_token ?? userInfo?.team.invite_token;
    if (inviteToken) {
      navigator.clipboard
        .writeText(inviteToken)
        .then(() => {
          customNotification.success({
            message: "Invite token copied to clipboard",
          });
        })
        .catch((err) => {
          customNotification.error({ message: err });
        });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto">
        <Card title="My team" subtitle="Team token">
          <div className="mt-4 flex items-center justify-between">
            <Typography.Text className="text-transparent-white">
              Share the invite token with the team
            </Typography.Text>
            <Button
              className="text-green-500 border-green-500"
              onClick={showModal}
            >
              show invite token
            </Button>

            <Modal
              title="Invite token"
              open={isModalOpen}
              className="text-transparent-white shadow-orange-700"
              onOk={handleOk}
              footer={false}
              onCancel={handleCancel}
            >
              <div className="flex gap-4 items-center justify-between">
                <Input
                  type="text"
                  value={teamInfo?.invite_token ?? userInfo?.team.invite_token}
                  className="!border-granite-gray !text-primary-text bg-transparent"
                  disabled
                />
                <div className="flex gap-2">
                  <Button
                    className="text-indigo-200 border-indigo-200"
                    onClick={() => resetInviteTokenMutation.mutate()}
                  >
                    Reset
                  </Button>
                  <Button
                    className="text-green-500 border-green-500"
                    onClick={handleCopyClick}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </Card>
        <Card title="Team profile" subtitle="">
          <div className="mt-4 flex items-center justify-between"></div>
        </Card>
      </div>
    </MainLayout>
  );
};
