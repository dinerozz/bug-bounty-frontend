import { Tag } from "antd";

export const handleReportStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return (
        <Tag className="w-full text-center bg-transparent" color="success">
          APPROVED
        </Tag>
      );
    case "REJECTED":
      return (
        <Tag className="w-full text-center bg-transparent" color="error">
          REJECTED
        </Tag>
      );
    case "NEED MORE DETAILS":
      return (
        <Tag className="w-full text-center bg-transparent" color="warning">
          NEED MORE DETAILS
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
