import { atom, selector } from "recoil";

export type TMembers = {
  id: string;
  username: string;
  points: number;
};

export type TTeam = {
  owner_id: string;
  id: string;
  invite_token: string;
  name: string;
  description: string;
  points: number;
  members: TMembers[];
};

type TUserInfo = {
  id: string;
  username: string;
  email: string;
  team: TTeam;
};

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const userInfoState = atom<TUserInfo | null>({
  key: "userInfoState",
  default: undefined,
});

export const teamInfo = atom<TTeam | null>({
  key: "teamInfoState",
  default: undefined,
});

export const userInfoStateSelector = selector<TUserInfo | null>({
  key: "userInfoStateSelector",
  get: ({ get }) => {
    const savedUserInfo = localStorage.getItem("userInfo");
    const userInfo = get(userInfoState);
    return savedUserInfo ? JSON.parse(savedUserInfo) : userInfo;
  },
  set: ({ set }, newValue) => {
    localStorage.setItem("userInfo", JSON.stringify(newValue));
    set(userInfoState, newValue);
  },
});

export const teamInfoStateSelector = selector<TTeam | null>({
  key: "teamInfoStateSelector",
  get: ({ get }) => get(teamInfo),
  set: ({ set }, newValue) => set(teamInfo, newValue),
});
