import { api } from "@/api/index";

type TScoreBoard = {
  id: number;
  name: string;
  points: number;
};

const getScoreboard = () =>
  api.get<TScoreBoard[]>("/scoreboard").then((res) => res.data);

export const scoreboardApi = {
  getScoreboard,
};
