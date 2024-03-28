import { api } from "@/api/index";

export type TSendReportPayload = {
  title: string;
  description: string;
  category: string;
};

type TSendReportResponse = {
  id: number;
  authorID: string;
  title: string;
  description: string;
  category: string;
  status: string;
};

const sendReport = (payload: TSendReportPayload) =>
  api.post<TSendReportResponse>("/report", payload).then((res) => res.data);

export const reportApi = {
  sendReport,
};
