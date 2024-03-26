import {
  Abilities,
  Action,
  defineUserAbilities,
  Subject,
} from "@/utils/defineUserAbilities";
import { useRecoilState } from "recoil";
import { userInfoStateSelector } from "@/store/authState";

interface CanProps {
  I: Action;
  a: Subject;
  children: () => JSX.Element;
}

export const Can: React.FC<CanProps> = ({ I, a, children }) => {
  const [user] = useRecoilState(userInfoStateSelector);
  const abilities = defineUserAbilities(user);

  const isAllowed = abilities.can(I, a);

  return isAllowed ? children() : null;
};
