import { api } from "@/api/index";

const createTeam = (payload: { name: string; ownerId: string }) =>
  api
    .post<{ name: string; ownerId: string }>("/team", payload)
    .then((res) => res.data);

export const teamApi = {
  createTeam,
};
