import { createAction } from "@reduxjs/toolkit";
import { Match, Player, Team } from "../../types";

const setMatch = createAction<Match>("SET_MATCH");
const setTeams = createAction<Team[]>("SET_TEAMS");
const addPlayer = createAction<Player>("ADD_PLAYER");
const updatePlayer = createAction<Player>("UPDATE_PLAYER");

export default { setMatch, setTeams, addPlayer, updatePlayer };
