import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTopscorers } from "../../api/apiFootball";
import { leagues } from "../../consts";
import { RootState } from "../store";

const addTopscorers = createAsyncThunk(
  "ADD_TOPSCORERS",
  async (season: number, { requestId, getState }) => {   
    const {currentRequestId, loading} = (getState() as RootState).api;

    if (loading !== "pending" || requestId !== currentRequestId) 
      return [];

    const response = await Promise.all(leagues.map(v => getTopscorers(season, v.id)));
    console.log(response);

    if (response[0].data.errors?.requests?.length) {
      throw new Error("Server is unable to provide the data. Please try again later.");
    }
    
    return response.map(v => ({ id: v.data.parameters.league, data: v.data.response[0] }));
  }
);

export default { addTopscorers };
