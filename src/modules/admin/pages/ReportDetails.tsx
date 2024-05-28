import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { reportApi, TReviewReportPayload } from "@/api/reportApi";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Spin,
  Typography,
} from "antd";
import customNotification from "@/utils/customNotification";
import { AxiosError } from "axios";
import { Forbidden } from "@/components/organisms/Forbidden";
import { conversationApi, TSendMessageRequest } from "@/api/conversationApi";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import FormItem from "antd/lib/form/FormItem";

export const ReportDetails = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const { id: reportId } = useParams();
  const [msg, setMsg] = useState({
    report_id: 0,
    message: "",
  });

  const {
    data: reportDetails,
    isLoading,
    isError,
    refetch: refetchReportDetails,
  } = useQuery(
    "report-details",
    () => reportApi.getReportDetails(reportId ?? ""),
    {
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err?.response?.data?.error }),
      enabled: reportId?.length! > 0,
    },
  );

  const {
    data: messages,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useQuery("messages", () => conversationApi.getMessages(reportId ?? ""), {
    onError: (err: AxiosError<{ error: string }>) =>
      customNotification.error({ message: err.response?.data?.error }),
  });

  const sendMessageMutation = useMutation(
    (payload: TSendMessageRequest) => conversationApi.sendMessage(payload),
    {
      onSuccess: () => {
        customNotification.success({ message: "Message sent" });
        setMsg({
          message: "",
          report_id: Number(reportId),
        });
        refetchMessages();
      },
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err?.response?.data?.error }),
    },
  );

  const sendReviewMutation = useMutation(
    (payload: TReviewReportPayload) => reportApi.reviewReport(payload),
    {
      onSuccess: () => {
        customNotification.success({ message: "Review sent" });
        refetchReportDetails();
        setOpen(false);
      },
      onError: (err: AxiosError<{ error: string }>) =>
        customNotification.error({ message: err?.response?.data?.error }),
    },
  );

  const handleSendReview = (payload: TReviewReportPayload) => {
    const castedPayload = {
      ...payload,
      points: Number(payload.points) ?? 0,
      report_id: Number(reportId),
    };
    sendReviewMutation.mutate(castedPayload);
  };

  const options = ["APPROVED", "REJECTED", "NEED MORE DETAILS"];

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
                  Notes
                </Typography.Text>
                <Typography.Text className="text-transparent-white">
                  {reportDetails?.reviewer_username}:{" "}
                  {reportDetails?.review_text}
                </Typography.Text>
              </div>
            )}
            {reportDetails?.report_data?.status === "PENDING" ||
              (reportDetails?.report_data?.status === "NEED MORE DETAILS" && (
                <>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setOpen(true)}
                      className="mt-4 text-green-500 border-green-500 hover:!border-green-300 hover:!text-green-300"
                    >
                      VERDICT
                    </Button>
                  </div>
                  <Modal
                    open={open}
                    onCancel={() => setOpen(false)}
                    maskClosable
                    closable
                    footer={false}
                  >
                    <Form layout="vertical" onFinish={handleSendReview}>
                      <FormItem
                        className="mt-4"
                        name="status"
                        label={
                          <Typography.Text className="!text-start text-lg font-bold text-transparent-white">
                            STATUS
                          </Typography.Text>
                        }
                      >
                        <Radio.Group
                          options={options}
                          onChange={(event) => setStatus(event.target.value)}
                          value={status}
                          optionType="button"
                          buttonStyle="solid"
                          className="text-transparent-white"
                        />
                      </FormItem>
                      {status === "APPROVED" && (
                        <FormItem
                          className="mt-4"
                          name="points"
                          label={
                            <Typography.Text className="!text-start text-lg font-bold text-transparent-white">
                              Points
                            </Typography.Text>
                          }
                        >
                          <Input
                            type="number"
                            size="large"
                            className="text-transparent-white bg-transparent max-w-[100px] border-solid border-[1px] border-granite-gray backdrop-blur-md outline-0 focus:shadow-none rounded-lg shadow-sm shadow-orange-700"
                          />
                        </FormItem>
                      )}
                      <FormItem
                        name="review_text"
                        label={
                          <Typography.Text className="text-transparent-white block text-lg font-bold">
                            Admin response
                          </Typography.Text>
                        }
                      >
                        <TextArea
                          rows={10}
                          className="text-white mt-4 block w-full text-transparent-white bg-transparent border-[1px] w-[400px] border-solid border-granite-gray backdrop-blur-md outline-0 focus:border-[#ff7a75] hover:border-[#ff7a75] focus:shadow-0 focus:outline-0 rounded-lg shadow-sm shadow-orange-700"
                        />
                      </FormItem>

                      <Button
                        htmlType="submit"
                        className="mt-4 text-primaryColor border-primaryColor"
                      >
                        SAVE
                      </Button>
                    </Form>
                  </Modal>
                </>
              ))}
          </div>
        </Card>
      )}

      {messages?.map((message, index) => (
        <Card title={`messageId: ${message.id}`} key={index}>
          <Typography.Text className="block mt-4 text-lg text-green-500">
            Message: {message.message}
          </Typography.Text>
        </Card>
      ))}

      {reportDetails?.report_data?.status === "PENDING" ||
        (reportDetails?.report_data?.status === "NEED MORE DETAILS" && (
          <Card title="Send message">
            <div>
              <TextArea
                value={msg.message}
                onChange={(e) =>
                  setMsg({
                    message: e.target.value,
                    report_id: Number(reportId),
                  })
                }
                className="mt-4 block w-full text-transparent-white bg-transparent border-[1px] w-[400px] border-solid border-granite-gray backdrop-blur-md outline-0 focus:border-[#ff7a75] hover:border-[#ff7a75] focus:shadow-0 focus:outline-0 rounded-lg shadow-sm shadow-orange-700"
              />
              <Button
                className="mt-4 text-green-500 border-green-500"
                onClick={() => sendMessageMutation.mutate(msg)}
              >
                SEND MESSAGE
              </Button>
            </div>
          </Card>
        ))}
    </MainLayout>
  );
};
