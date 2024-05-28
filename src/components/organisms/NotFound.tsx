import { Card } from "@/components/molecules/Card";
import { Typography } from "antd";

export const NotFound = () => {
  return (
    <Card title="" subtitle="">
      <Typography.Text className="flex justify-center items-center text-primaryColor font-bold text-6xl">
        404 PAGE NOT FOUND
      </Typography.Text>
    </Card>
  );
};
