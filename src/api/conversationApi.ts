import { api } from "@/api/index";

export type TSendMessageRequest = {
  report_id: number;
  message: string;
};

type TSendMessagesResponse = {
  id: string;
  report_id: number;
  user_id: string;
  message: string;
};

type TGetMessagesResponse = {
  id: string;
  report_id: number;
  user_id: string;
  message: string;
};

const sendMessage = (payload: TSendMessageRequest) =>
  api
    .post<TSendMessagesResponse>(
      "/report/details/conversation/send-message",
      payload,
    )
    .then((res) => res.data);

const getMessages = (reportId: string) =>
  api
    .get<TGetMessagesResponse[]>("/report/details/conversation/messages", {
      params: {
        reportId,
      },
    })
    .then((res) => res.data);

export const conversationApi = {
  sendMessage,
  getMessages,
};
