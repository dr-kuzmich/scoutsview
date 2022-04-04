import { Match, Player, Team } from "../types";

const setMatch = (value: Match) => {
  return {
    type: "SET_MATCH",
    payload: value,
  };
};

const setTeams = (value: Team[]) => {
  return {
    type: "SET_TEAMS",
    payload: value,
  };
};

const addPlayer = (value: Player) => {
  return {
    type: "ADD_PLAYER",
    payload: value,
  };
};

const updatePlayer = (value: Player) => {
  return {
    type: "UPDATE_PLAYER",
    payload: value,
  };
};

export default { setMatch, setTeams, addPlayer, updatePlayer };
