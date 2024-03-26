import { selector } from "recoil";
import { userInfoStateSelector } from "@/store/authState";
import { defineUserAbilities } from "@/utils/defineUserAbilities";

export const userAbilitiesSelector = selector({
  key: "userAbilities",
  get: ({ get }) => {
    const user = get(userInfoStateSelector);
    return defineUserAbilities(user);
  },
});
