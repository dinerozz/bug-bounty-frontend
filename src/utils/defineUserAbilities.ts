import { TUserInfo } from "@/store/authState";

export type Action = "read" | "write" | "readTeamReports" | "access";
export type Subject = "all" | "admin" | "hasTeam" | "teamReports" | "team";

export interface Rules {
  can: Partial<Record<Action, Subject[]>>;
  cannot: Partial<Record<Action, Subject[]>>;
}

export interface Abilities {
  can: (action: Action, subject: Subject) => boolean;
}

export const defineUserAbilities = (user: TUserInfo | null): Abilities => {
  const rules: Rules = {
    can: {},
    cannot: {},
  };

  rules.can.read = ["all"];

  if (user?.team) {
    rules.can.read = ["teamReports", "all"];
    rules.cannot.read = ["team"];
  } else {
    rules.cannot.read = ["teamReports"];
  }

  if (!user?.isAdmin) {
    rules.cannot.read = [...(rules.cannot.read || []), "admin"];
  }

  const can = (action: Action, subject: Subject): boolean => {
    const allowed =
      rules.can[action]?.includes(subject) ||
      rules.can[action]?.includes("all");
    const denied = rules.cannot[action]?.includes(subject);

    return !!allowed && !denied;
  };

  return { can };
};
