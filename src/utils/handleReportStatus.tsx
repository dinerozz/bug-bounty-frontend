import { Tag } from "antd";

export const handleReportStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return (
        <Tag className="w-full text-center bg-transparent" color="success">
          APPROVED
        </Tag>
      );
    case "DECLINED":
      return (
        <Tag className="w-full text-center bg-transparent" color="error">
          APPROVED
        </Tag>
      );
    case "NEED DETAILS":
      return (
        <Tag className="w-full text-center bg-transparent" color="warning">
          NEED DETAILS
        </Tag>
      );
    default:
      return (
        <Tag className="w-full text-center bg-transparent" color="processing">
          PENDING
        </Tag>
      );
  }
};
