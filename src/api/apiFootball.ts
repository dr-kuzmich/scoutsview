import axios from "axios";
import { once } from "lodash";

// https://www.api-football.com/ & https://dashboard.api-football.com/
const API_KEY = "92a8954a5629cc302e02cbb2074324da";
const PATH = "/players/topscorers";

const getInstance = once(() => axios.create({
  baseURL: "https://v3.football.api-sports.io",  
}));

export const getTopscorers = async (season: number, leagueId: number) => 
  getInstance().get(
    `${PATH}?season=${season}&league=${leagueId}`,
    {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    },
  );
