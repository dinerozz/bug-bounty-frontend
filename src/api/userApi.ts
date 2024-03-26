import { api } from "@/api/index";
import { TTeam, TUserInfo } from "@/store/authState";

type TCurrentUserResponse = {
  id: string;
  username: string;
  email: string;
  team: TTeam;
};

type TUsersSearchResponse = TCurrentUserResponse;

const getCurrentUser = () =>
  api.get<TUserInfo>("/current").then((res) => res.data);

const findByUsername = (username: string) =>
  api
    .get<TUsersSearchResponse[]>(`/api/v1/users/search/${username}`)
    .then((res) => res.data);

export const userApi = {
  getCurrentUser,
  findByUsername,
};
