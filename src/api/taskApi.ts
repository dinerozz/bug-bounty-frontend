import { api } from "@/api/index";

type TTask = {
  id: string;
  author_id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  isActive: boolean;
};

export type TTaskPayload = {
  title: string;
  description: string;
  category: string;
  points: number;
  isActive: boolean;
};

const getTasks = () =>
  api
    .get<
      {
        id: number;
        author_id: string;
        title: string;
        description: string;
        isActive: boolean;
      }[]
    >("/tasks")
    .then((res) => res.data);

const createTask = (payload: TTaskPayload) =>
  api.post<TTask>("/admin/tasks", payload).then((res) => res.data);

export const taskApi = {
  getTasks,
  createTask,
};
