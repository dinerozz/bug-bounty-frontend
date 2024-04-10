import { Card } from "@/components/molecules/Card";
import { Button, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import { FC } from "react";
import { TReportsResponse } from "@/api/reportApi";
import { handleReportStatus } from "@/utils/handleReportStatus";
import { FolderOpenFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type TReportsProps = {
  loading: boolean;
  reports?: any[];
  isAdmin?: boolean;
};

export const Reports: FC<TReportsProps> = ({
  loading,
  reports = [],
  isAdmin = false,
}) => {
  const navigate = useNavigate();

  const reportColumns: ColumnType<TReportsResponse>[] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => handleReportStatus(status),
    },
    {
      title: "action",
      align: "center",
      key: "action",
      render: (_, report) => (
        <Button
          onClick={() =>
            navigate(
              isAdmin
                ? `/admin/report/${report.id}/details`
                : `/report/${report.id}/details`,
            )
          }
          size="small"
          className="mx-auto text-transparent-white flex items-center justify-center border-primaryColor"
        >
          <FolderOpenFilled rev={undefined} />
        </Button>
      ),
    },
  ];

  return (
    <Card title="Reports" subtitle="">
      <div className="mt-4 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
        <Table
          loading={loading}
          pagination={false}
          columns={reportColumns}
          className="w-full"
          dataSource={reports}
        />
      </div>
    </Card>
  );
};
