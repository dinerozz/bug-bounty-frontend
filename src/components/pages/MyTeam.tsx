import { FC, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Button, Input, Modal, Table, Typography } from "antd";
import { useRecoilState } from "recoil";
import { teamInfoStateSelector, TMembers } from "@/store/authState";
import customNotification from "@/utils/customNotification";
import { useMutation, useQuery } from "react-query";
import { teamApi } from "@/api/teamApi";
import { AxiosError } from "axios";
import { userApi } from "@/api/userApi";
import { ColumnType } from "antd/lib/table";

export const MyTeam: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const { data: user, isLoading } = useQuery("current-user", () =>
    userApi.getCurrentUser(),
  );

  const { data: myTeam, isLoading: isMyTeamLoading } = useQuery("my-team", () =>
    teamApi.getMyTeam(),
  );

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
    const inviteToken = teamInfo?.invite_token ?? user?.team?.invite_token;
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
    } else {
      customNotification.error({ message: "Не удалось скопировать токен" });
    }
  };

  const columns: ColumnType<TMembers>[] = [
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "points",
      dataIndex: "points",
      key: "points",
      render: (points) => (
        <Typography.Text className="text-transparent-white">
          {points ?? 0}
        </Typography.Text>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto">
        {user?.team?.owner_id === user?.id && (
          <Card title="My team" subtitle="Team token" loading={isLoading}>
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
                    value={teamInfo?.invite_token ?? user?.team?.invite_token}
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
        )}
        <Card
          title={`Team ${myTeam?.name}`}
          subtitle={myTeam?.description ?? "Description"}
        >
          <div className="mt-4 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
            <p className="text-transparent-white text-lg font-bold">
              team points: {myTeam?.points}
            </p>
            <Table
              loading={isMyTeamLoading}
              pagination={false}
              columns={columns}
              className="w-full"
              dataSource={myTeam?.members}
            />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};
