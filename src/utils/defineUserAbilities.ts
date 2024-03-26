import { TUserInfo } from "@/store/authState";

export type Action = "read" | "write";
export type Subject = "all" | "admin" | "hasTeam";

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
    rules.cannot.read = [...(rules.cannot.read || []), "hasTeam"];
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
