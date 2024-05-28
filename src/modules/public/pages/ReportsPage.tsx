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
import { Reports } from "@/components/organisms/Reports";
import { data } from "autoprefixer";

export const ReportsPage = () => {
  const navigate = useNavigate();
  const { data: reports, isLoading } = useQuery(
    "reports",
    () => reportApi.getReports(),
    {
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err.response?.data.error }),
    },
  );

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
      <Reports loading={isLoading} reports={reports} />
    </MainLayout>
  );
};
