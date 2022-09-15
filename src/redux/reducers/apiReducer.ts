import { createReducer } from "@reduxjs/toolkit";
import { TopscorersLoadingData } from "../../types";
import apiActions from "../actions/apiActions";

const initialState: TopscorersLoadingData = {
  topscorers: {},
  loading: "idle",
  currentRequestId: undefined,
  error: undefined,
};

const apiReducer = createReducer(initialState, builder => {
  builder
    .addCase(apiActions.addTopscorers.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = undefined;
        state.currentRequestId = action.meta.requestId;
      }
    })  
    .addCase(apiActions.addTopscorers.fulfilled, (state, action) => {
      if (state.loading === "pending" && state.currentRequestId === action.meta.requestId) {
        state.loading = "idle";
        action.payload.forEach(v => {
          state.topscorers[v.id] = !v.data ? {} : {
            photo: v.data.player.photo,
            name: `${v.data.player.firstname} ${v.data.player.lastname}`,
            club: v.data.statistics[0].team.name,
            goals: v.data.statistics[0].goals.total,
            league: v.data.statistics[0].league.name, 
            logo: v.data.statistics[0].league.logo,
          };
        });
        state.currentRequestId = undefined;
      }
    })
    .addCase(apiActions.addTopscorers.rejected, (state, action) => {
      if (state.loading === "pending" && state.currentRequestId === action.meta.requestId) {
        state.loading = "idle";
        state.error = `${action.error.name}! ${action.error.message}`;
        state.currentRequestId = undefined;
      }
    });
});

export default apiReducer;
