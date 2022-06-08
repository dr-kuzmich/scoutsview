import { createReducer } from "@reduxjs/toolkit";
// import { clone } from "lodash";
import { TTA } from "../../types";
import ttaActions from "../actions/ttaActions";

const initialState: TTA = { match: undefined, teams: undefined, players: [] };

const ttaReducer = createReducer(initialState, builder => {
  builder
    .addCase(ttaActions.setMatch, (state, action) => {
      state.match = action.payload;
    })
    .addCase(ttaActions.setTeams, (state, action) => {
      state.teams = action.payload;
    })
    .addCase(ttaActions.addPlayer, (state, action) => {
      // state.players.push(action.payload);
      state.players = [...state.players, action.payload];      

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
