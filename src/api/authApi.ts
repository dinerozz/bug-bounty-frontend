import { api } from "@/api/index";
import { TTeam } from "@/store/authState";

export type TAuthRequest = {
  username: string;
  password: string;
};

export type TSignUpRequest = {
  email: string;
  username: string;
  password: string;
};

type TAuthResponse = {
  id: string;
  email: string;
  username: string;
  team: TTeam;
};

const signUp = (payload: TSignUpRequest) =>
  api.post<TAuthResponse>("/register", payload).then((res) => res.data);

const login = (payload: TAuthRequest) =>
  api.post<TAuthResponse>("/authenticate", payload).then((res) => {
    return res.data;
  });

const logout = () => api.post("/logout").then((res) => res.data);

export const authApi = {
  signUp,
  login,
  logout,
};
