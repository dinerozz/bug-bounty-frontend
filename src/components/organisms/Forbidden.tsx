import { Card } from "@/components/molecules/Card";
import { Typography } from "antd";

export const Forbidden = () => {
  return (
    <Card title="" subtitle="">
      <Typography.Text className="flex justify-center items-center text-primaryColor font-bold text-6xl">
        403 FORBIDDEN
      </Typography.Text>
    </Card>
  );
};
