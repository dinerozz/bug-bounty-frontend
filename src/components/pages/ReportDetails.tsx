import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { reportApi } from "@/api/reportApi";
import { Divider, Spin, Typography } from "antd";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";
import { Forbidden } from "@/components/organisms/Forbidden";

export const ReportDetails = () => {
  const { id: reportId } = useParams();

  const {
    data: reportDetails,
    isLoading,
    isError,
  } = useQuery(
    "report-details",
    () => reportApi.getReportDetails(reportId ?? ""),
    {
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err?.response?.data?.error }),
      enabled: reportId?.length! > 0,
    },
  );

  return (
    <MainLayout>
      {isError ? (
        <Forbidden />
      ) : isLoading ? (
        <Spin className="flex items-center justify-center mt-10" size="large" />
      ) : (
        <Card
          title="Report details"
          reportStatus={reportDetails?.report_data?.status}
          tag={reportDetails?.report_data?.category}
        >
          <div>
            <div className="flex flex-col mt-4">
              <Typography.Text className="text-transparent-white block text-lg font-bold">
                Title
              </Typography.Text>
              <Typography.Text className="text-transparent-white">
                {reportDetails?.report_data?.title}
              </Typography.Text>
              <Typography.Text className="text-transparent-white text-lg block mt-4 font-bold">
                Description
              </Typography.Text>
              <Typography.Text className="text-transparent-white">
                {reportDetails?.report_data?.description}
              </Typography.Text>
            </div>
            <Divider />
            {reportDetails?.reviewer_id && (
              <div className="mt-6">
                <Typography.Text className="text-transparent-white block text-lg font-bold">
                  Review details
                </Typography.Text>
                <Typography.Text className="text-transparent-white">
                  Reviewer: {reportDetails?.reviewer_username}
                </Typography.Text>
                <Typography.Text className="text-transparent-white block text-lg font-bold mt-4">
                  Verdict
                </Typography.Text>
                <Typography.Text className="text-transparent-white">
                  Reviewer: {reportDetails?.review_text}
                </Typography.Text>
              </div>
            )}
          </div>
        </Card>
      )}
    </MainLayout>
  );
};
