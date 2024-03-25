import { api } from "@/api/index";

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

export const taskApi = {
  getTasks,
};
