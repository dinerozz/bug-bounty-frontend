import { atom, selector } from "recoil";

type TUserInfo = {
  id: string;
  username: string;
  email: string;
  team: {
    owner_id: string;
    id: string;
    invite_token: string;
    name: string;
  };
};

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const userInfoState = atom<TUserInfo | null>({
  key: "userInfoState",
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
