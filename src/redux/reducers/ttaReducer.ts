import { createReducer } from "@reduxjs/toolkit";
// import { clone } from "lodash";
import { TTA } from "../../types";
import ttaActions from "../actions/ttaActions";

// const initialState: TTA = { match: undefined, teams: undefined, players: [] };
const initialState: TTA = { 
  match: { team0Id: "Man United", team1Id: "PSG", date: "01/02/2002", place: "Barcelona", weatherId: "1" }, 
  teams: [{ id: "0", value: "Man United" }, { id: "1", value: "PSG" }], 
  players: [
    { 
      id: "0", status: "new", teamId: "0", position: { id: "14", short: "CF", value: "Centre forward" }, value: "Cristiano Ronaldo",
      airDuelsMistaken: 0, airDuelsSuccessful: 0, dribblingsMistaken: 0, dribblingsSuccessful: 0, passesMistaken: 0, passesSuccessful: 0,
      shotsMistaken: 0, shotsSuccessful: 0, tacklesMistaken: 0, tacklesSuccessful: 0,
    },
    { 
      id: "1", status: "new", teamId: "1", position: { id: "15", short: "RF", value: "Right forward" }, value: "Lionel Messi",
      airDuelsMistaken: 0, airDuelsSuccessful: 0, dribblingsMistaken: 0, dribblingsSuccessful: 0, passesMistaken: 0, passesSuccessful: 0,
      shotsMistaken: 0, shotsSuccessful: 0, tacklesMistaken: 0, tacklesSuccessful: 0,
    },
  ], 
};

const ttaReducer = createReducer(initialState, builder => {
  builder
    .addCase(ttaActions.setMatch, (state, action) => {
      state.match = action.payload;
    })
    .addCase(ttaActions.setTeams, (state, action) => {
      state.teams = action.payload;
    })
    .addCase(ttaActions.addPlayer, (state, action) => {
      state.players.push(action.payload);
      // state.players = [...state.players, action.payload];      

      // FOR TESTS!
      // for (let i = 0; i < 20; i++) {     
      //   const player = clone(action.payload);   
      //   console.log(player.id);
      //   player.id = player.id + i.toString();
      //   state.players = [...state.players, player];
      // }
    })
    .addCase(ttaActions.updatePlayer, (state, action) => {
      state.players = [...state.players.filter(v => v.id !== action.payload.id), action.payload];
    });
});

export default ttaReducer;
