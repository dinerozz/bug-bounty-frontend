import { api } from "@/api/index";
import { TTeam } from "@/store/authState";

const createTeam = (payload: { name: string; ownerId: string }) =>
  api.post<TTeam>("/team", payload).then((res) => res.data);

const resetInviteToken = () =>
  api
    .patch<{ invite_token: string }>("/team/invite-token")
    .then((res) => res.data);

export const teamApi = {
  createTeam,
  resetInviteToken,
};
