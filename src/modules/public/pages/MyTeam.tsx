import { FC, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import {
  Avatar,
  Button,
  Form,
  Input,
  List,
  message,
  Modal,
  Table,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useRecoilState } from "recoil";
import { teamInfoStateSelector, TMembers } from "@/store/authState";
import customNotification from "@/utils/customNotification";
import { useMutation, useQuery } from "react-query";
import { teamApi } from "@/api/teamApi";
import { AxiosError } from "axios";
import { userApi } from "@/api/userApi";
import { ColumnType } from "antd/lib/table";
import {
  LoadingOutlined,
  PlusOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const MyTeam: FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamInfo, setTeamInfo] = useRecoilState(teamInfoStateSelector);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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

  const {
    data: myTeam,
    isLoading: isMyTeamLoading,
    isError,
  } = useQuery("my-team", () => teamApi.getMyTeam());

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

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as File, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? (
        <LoadingOutlined rev={undefined} />
      ) : (
        <PlusOutlined rev={undefined} />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  if (isError) {
    return (
      <MainLayout>
        <Card title="">
          <div className="flex items-center justify-center flex-col">
            <Typography.Text className="flex justify-center items-center text-primaryColor font-bold text-6xl">
              You are not part of the team.
            </Typography.Text>
            <Button
              onClick={() => navigate("/team")}
              size="large"
              className="mt-4 text-green-500 border-green-500"
            >
              Join or create team
            </Button>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto">
        {user?.team?.owner_id && user?.team?.owner_id === user?.id && (
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
        {myTeam?.id && (
          <Card title="Team Settings" subtitle="">
            <div className="flex w-full gap-4 items-center">
              <div>
                <Typography.Text className="text-transparent-white text-lg">
                  Name: {myTeam?.name}
                </Typography.Text>
                <Form layout="vertical">
                  <Form.Item className="w-fit mt-4">
                    <Upload
                      name="avatar"
                      listType="picture-circle"
                      className="text-transparent-white"
                      showUploadList={false}
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                </Form>
              </div>
              <List
                className="w-full text-transparent-white"
                itemLayout="horizontal"
                dataSource={myTeam?.members}
                renderItem={(member, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={
                        <div className="flex justify-between items-center">
                          <Typography.Text className="text-transparent-white">
                            {member.username}
                          </Typography.Text>
                          <Typography.Text className="text-transparent-white">
                            {user?.team.owner_id &&
                            member.id === user?.team.owner_id!
                              ? "team leader"
                              : ""}
                          </Typography.Text>
                        </div>
                      }
                      description="cyber security enthusiast"
                    />
                    {member.id !== user?.team?.owner_id! && (
                      <Button size="small" className="text-transparent-white">
                        <UserDeleteOutlined rev={undefined} />
                      </Button>
                    )}
                  </List.Item>
                )}
              />
            </div>
          </Card>
        )}
        {myTeam?.id && (
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
        )}
      </div>
    </MainLayout>
  );
};
