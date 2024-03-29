import MainLayout from "@/components/templates/MainLayout";
import { Button, Table, Tag, Typography } from "antd";
import { useQuery } from "react-query";
import { reportApi, TReportsResponse } from "@/api/reportApi";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";
import { ColumnType } from "antd/lib/table";
import { handleReportStatus } from "@/utils/handleReportStatus";
import { Card } from "@/components/molecules/Card";
import { FolderOpenFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
  const navigate = useNavigate();
  const { data: reports, isLoading } = useQuery(
    "reports",
    () => reportApi.getReports(),
    {
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err.response?.data.error }),
    },
  );

  const columns: ColumnType<TReportsResponse>[] = [
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
          onClick={() => navigate(`/report-details/${report.id}`)}
          size="small"
          className="mx-auto text-transparent-white flex items-center justify-center border-primaryColor"
        >
          <FolderOpenFilled rev={undefined} />
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <Card title="Send report" subtitle="">
        <div className="flex items-center justify-between">
          <Typography.Text className="text-transparent-white">
            Send vulnerability report
          </Typography.Text>
          <Button
            className="text-green-500 border-green-500"
            onClick={() => navigate("/send-report")}
          >
            Send report
          </Button>
        </div>
      </Card>
      <Card title="Reports" subtitle="">
        <div className="mt-4 border-solid border-[1px] border-granite-gray w-full bg-[rgba(60,34,37,0.3)] backdrop-blur-md p-5 rounded-lg shadow-sm shadow-orange-700 relative">
          <Table
            loading={isLoading}
            pagination={false}
            columns={columns}
            className="w-full"
            dataSource={reports}
          />
        </div>
      </Card>
    </MainLayout>
  );
};
