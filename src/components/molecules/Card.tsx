import { FC } from "react";
import { Spin, Tag, Typography } from "antd";
import { handleReportStatus } from "@/utils/handleReportStatus";

export const Card: FC<{
  title: string;
  subtitle?: string;
  children: JSX.Element;
  loading?: boolean;
  tag?: string;
  reportStatus?: string;
}> = ({ title, subtitle, children, tag, reportStatus, loading = false }) => {
  return loading ? (
    <Spin size="large" className="flex items-center justify-center" />
  ) : (
    <div className="mt-10 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
      <div className="bg-cyber inset-0 absolute bg-cover opacity-10 -z-10" />
      <div className="z-20">
        <Typography.Text className="!text-transparent-white text-xl">
          {title}
        </Typography.Text>
        {subtitle?.length! > 0 && (
          <Typography.Text className="!text-transparent-white block">
            {subtitle}
          </Typography.Text>
        )}
        {tag?.length! > 0 && reportStatus?.length! > 0 && (
          <div className="flex">
            <Tag
              color="success"
              className="w-fit block bg-green-700 text-transparent-white"
            >
              {tag}
            </Tag>
            <div className="w-fit">
              {handleReportStatus(reportStatus ?? "")}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
