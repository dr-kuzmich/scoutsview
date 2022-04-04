import { AnyAction } from "@reduxjs/toolkit";
import { Match, Player, Team, TTA } from "../types";

const initialState: TTA = { match: undefined, teams: undefined, players: [] };

// const ttaReducer = (state = <TTA>{}, action: AnyAction) => {
const ttaReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
  case "SET_MATCH":
    return {
      ...state,
      match: action.payload as Match,
    };
  case "SET_TEAMS":
    return {
      ...state,
      teams: action.payload as Team[],
    };
  case "ADD_PLAYER":
    return {
      ...state,
      players: [...state.players, action.payload as Player],
    };  
  case "UPDATE_PLAYER":
    return {
      ...state,
      players: [...state.players.filter(v => v.id !== action.payload.id), action.payload as Player],
    };   
  default:
    return state;
  }
};

export default ttaReducer;
