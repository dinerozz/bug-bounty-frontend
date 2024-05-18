import React, { FC } from "react";
import { Empty } from "antd";
import { TEmptyStateProps } from "@/components/atoms/EmptyState/props";

export const EmptyState: FC<TEmptyStateProps> = ({
  className = "flex-grow w-full bg-primaryChat flex items-center justify-center",
  description = "Select chat from chat list",
}) => {
  return (
    <div className={className}>
      <Empty
        image={<p />}
        description={
          <p className="text-primaryText text-[18px]">{description}</p>
        }
      />
    </div>
  );
};
