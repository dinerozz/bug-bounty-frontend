import { FC, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Button, Input, Modal, Typography } from "antd";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";

export const MyTeam: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo] = useRecoilState(userInfoStateSelector);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
                  value={userInfo?.team.invite_token}
                  className="!border-granite-gray !text-primary-text bg-transparent"
                  disabled
                />

                <div className="flex gap-2">
                  <Button className="text-indigo-200 border-indigo-200">
                    Reset
                  </Button>
                  <Button className="text-green-500 border-green-500">
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
