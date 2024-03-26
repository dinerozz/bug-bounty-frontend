import { defineAbility } from "@casl/ability";
import { TUserInfo } from "@/store/authState";

export const defineUserAbilities = (user: TUserInfo | null) => {
  return defineAbility((can, cannot) => {
    can("read", "all");
    if (user?.team) cannot("read", ["hasTeam"]);
    if (!user?.isAdmin) cannot("read", ["admin"]);
  });
};
