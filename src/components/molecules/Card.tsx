import { FC } from "react";
import { Typography } from "antd";

export const Card: FC<{
  title: string;
  subtitle: string;
  children: JSX.Element;
}> = ({ title, subtitle, children }) => {
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
