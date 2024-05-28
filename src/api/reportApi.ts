import { api } from "@/api/index";

export type TSendReportPayload = {
  title: string;
  description: string;
  category: string;
  team_id: number;
};

type TSendReportResponse = {
  id: number;
  authorID: string;
  title: string;
  description: string;
  category: string;
  status: string;
};

export type TReportsResponse = {
  id: number;
  report_id: number;
  title: string;
  category: string;
  description?: string;
  status: string;
};

export type TReportDetails = {
  report_id: number;
  reviewer_id: string;
  reviewer_username: string;
  review_text: string;
  report_data: TReportsResponse;
};

export type TReviewReportPayload = {
  report_id: number;
  review_text: string;
  points: number;
  status: string;
};

export type TReviewReportResponse = {
  report_id: number;
  reviewer_id: string;
  review_text: string;
  Status: string;
  points: number;
};

const sendReport = (payload: TSendReportPayload) =>
  api.post<TSendReportResponse>("/report", payload).then((res) => res.data);

const getReports = () =>
  api.get<TReportsResponse[]>("/report").then((res) => res.data);

const getAdminReports = () =>
  api.get<TReportsResponse[]>("/admin/reports").then((res) => res.data);

const getReportDetails = (id: string) =>
  api
    .get<TReportDetails>("/report/details", { params: { reportId: id } })
    .then((res) => res.data);

const reviewReport = (payload: TReviewReportPayload) =>
  api.post<TReviewReportResponse>("/admin/report/review", payload);

export const reportApi = {
  reviewReport,
  sendReport,
  getReports,
  getReportDetails,
  getAdminReports,
};
