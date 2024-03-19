import { api } from "@/api/index";

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
  token: string;
};

const signUp = (payload: TSignUpRequest) =>
  api.post<TAuthResponse>("/register", payload).then((res) => res.data);

const login = (payload: TAuthRequest) =>
  api.post<TAuthResponse>("/authenticate", payload).then((res) => {
    localStorage.setItem("token", res.data.token);
    return res.data;
  });

const logout = (userId: string) =>
  api.post("/api/v1/auth/logout", { userId }).then((res) => res.data);

export const authApi = {
  signUp,
  login,
  logout,
};
